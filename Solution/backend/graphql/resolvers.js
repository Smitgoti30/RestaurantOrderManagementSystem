import mongoose from "mongoose";
import cloudinary from "../utils/cloudinary.js";

import Category from "../models/Category.js";
import Customer from "../models/Customer.js";
import Menu from "../models/Menu.js";
import Order from "../models/Order.js";
import OrderedItems from "../models/OrderedItems.js";
import Receipt from "../models/Receipt.js";
import bcrypt from "bcrypt";

// Hash password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const resolvers = {
  Query: {
    getCustomer: async (_, { id }) => {
      return await Customer.findById(id);
    },
    getAllCustomers: async (parent, args, context, info) => {
      try {
        return await Customer.find({});
      } catch (error) {
        throw new Error("Unable to fetch customers");
      }
    },
    getAllMenuItems: async (parent, args, context, info) => {
      try {
        return await Menu.find({});
      } catch (error) {
        throw new Error("Unable to fetch customers");
      }
    },
    getAllCustomersWithLatestOrder: async (_, { filters } = {}) => {
      let customerQuery = {};
      let orderQuery = {};

      if (filters) {
        customerQuery = {
          ...(filters.firstName && {
            firstName: { $regex: filters.firstName, $options: "i" },
          }),
          ...(filters.lastName && {
            lastName: { $regex: filters.lastName, $options: "i" },
          }),
          ...(filters.email && {
            email: { $regex: filters.email, $options: "i" },
          }),
          ...(filters.phone && { phone: filters.phone }),
        };

        orderQuery = {
          ...(filters.status && { status: filters.status }),
          ...(filters.type && { type: filters.type }),
          ...(filters.tableNumber && { tableNumber: filters.tableNumber }),
        };
      }

      // fetching logic
      try {
        customerQuery.type = "dining";
        const customers = await Customer.find(customerQuery).lean();

        for (let customer of customers) {
          const latestOrder = await Order.findOne({
            customer_id: customer._id,
            status: { $ne: "Completed" },
            ...orderQuery,
          }).sort({ date_time: -1 });
          customer.latestOrder = latestOrder;
        }
        console.log(customers);
        return customers;
      } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch customers with filters");
      }
    },
    getOrderById: async (_, { id }) => {
      try {
        const order = await Order.findById(id);
        if (!order) {
          throw new Error("Order not found");
        }
        const orderedItems = await OrderedItems.find({ order_id: id });
        const orderDetails = order.toObject();
        orderDetails.items = orderedItems.map((item) => item.toObject());

        return orderDetails;
      } catch (error) {
        console.error(error);
        throw new Error(`Fetching order by ID failed: ${error.message}`);
      }
    },
    getOrderDetails: async (_, { id }) => {
      try {
        const order = await Order.findById(id);
        if (!order) {
          throw new Error("Order not found");
        }
        const customer = await Customer.findById(order.customer_id);
        if (!customer) throw new Error("Customer not found");

        const orderedItems = await OrderedItems.find({ order_id: id }).populate(
          "menu_id"
        );
        let subTotal = 0;
        const items = orderedItems.map((item) => {
          const itemSubTotal = item.quantity * item.menu_id.price;
          const itemTax = itemSubTotal * 0.1;
          subTotal += itemSubTotal;
          return {
            name: item.menu_id.name,
            quantity: item.quantity,
            price: item.menu_id.price,
            subTotal: itemSubTotal,
            tax: itemTax,
          };
        });
        const totalTax = subTotal * 0.1;
        const totalAmount = subTotal + totalTax;

        return {
          _id: "",
          order_id: id,
          customer: {
            _id: customer._id,
            name: `${customer.firstName} ${customer.lastName}`,
            phone: customer.phone,
            email: customer.email,
          },
          items: items,
          payment_method: "-",
          sub_total: subTotal,
          tax_amount: totalTax,
          total_amount: totalAmount,
          date: new Date(),
        };
      } catch (error) {
        console.error(error);
        throw new Error(`Fetching order by ID failed: ${error.message}`);
      }
    },
    getReceiptById: async (_, { receiptId }) => {
      try {
        return await Receipt.findById(receiptId);
      } catch (error) {
        throw new Error(`Fetching receipt by ID failed: ${error.message}`);
      }
    },
    getCustomerOrders: async (_, { customerId }) => {
      try {
        const receipts = await Receipt.find({ "customer._id": customerId });
        return receipts;
      } catch (error) {
        throw new Error(`Failed to fetch receipts: ${error.message}`);
      }
    },
    getAllCategories: async () => {
      try {
        const categories = await Category.find();
        return categories;
      } catch (error) {
        throw new Error('Error fetching categories');
      }
    },
    getCategory: async (_, { id }) => {
      try {
        const category = await Category.findById(id);
        return category;
      } catch (error) {
        throw new Error('Error fetching category');
      }
    },
    getAllMenus: async () => {
      try {
        const menus = await Menu.find();
        return menus;
      } catch (error) {
        throw new Error('Error fetching menus');
      }
    },
    getMenuItem: async (_, { id }) => {
      try {
        const menuItem = await Menu.findById(id);
        return menuItem;
      } catch (error) {
        throw new Error('Error fetching menu item');
      }
    },
  },
  Mutation: {
    createCustomer: async (parent, args, context, info) => {
      try {
        console.log("createCustomer", args);
        let user;
        if (args?.customer_details?.type == "dining") {
          user = new Customer({
            ...args.customer_details,
          });
          await user.save();
        } else {
          // Check if the user already exists based on the email
          const existingCustomer = await Customer.findOne({
            email: args.customer_details.email,
          });
          if (existingCustomer) {
            throw new Error("Customer already exists");
          }

          const hashedPassword = await hashPassword(
            args.customer_details.password
          );

          user = new Customer({
            ...args.customer_details,
            password: hashedPassword,
          });
          await user.save();
        }
        return user;
      } catch (error) {
        console.log(error);
        throw new Error(`Create Customer failed: ${error.message}`);
      }
    },
    deleteCustomer: async (parent, args, context, info) => {
      try {
        const deletedCustomer = await Customer.findByIdAndDelete(
          args.customer_id
        );
        if (!deletedCustomer) {
          throw new Error("Customer not found");
        }
        return deletedCustomer;
      } catch (error) {
        throw new Error(`Can't Delete Customer: ${error.message}`);
      }
    },
    updateCustomer: async (_, { customerId, customerDetails }) => {
      try {
        console.log("updateCustomer", customerId);
        const updatedCustomer = await Customer.findByIdAndUpdate(
          customerId,
          customerDetails,
          { new: true }
        );
        return updatedCustomer;
      } catch (error) {
        throw new Error(error);
      }
    },
    createOrder: async (_, { order, items }) => {
      try {
        let orderResponse;
        if (order.order_id) {
          const existingOrder = await Order.findById(order.order_id);
          console.log("Existing Order", existingOrder);
          if (!existingOrder) {
            throw new Error("Order not found");
          }

          existingOrder.table_number =
            order.table_number || existingOrder.table_number;
          existingOrder.status = order.status || existingOrder.status;
          await existingOrder.save();
          await OrderedItems.deleteMany({ order_id: order.order_id });
          for (const item of items) {
            const newItem = new OrderedItems({
              ...item,
              order_id: order.order_id,
            });
            await newItem.save();
          }

          orderResponse = existingOrder;
        } else {
          const newOrder = new Order({
            ...order,
            date_time: order.date_time || Date.now(),
          });
          await newOrder.save();

          for (const item of items) {
            const newItem = new OrderedItems({
              ...item,
              order_id: newOrder._id,
            });
            await newItem.save();
          }

          orderResponse = newOrder;
        }

        return orderResponse;
      } catch (error) {
        throw new Error(`Failed to process order: ${error.message}`);
      }
    },
    completeOrder: async (_, { orderId }) => {
      console.log("completeOrder 1", orderId);
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Find and update the order status to 'Completed'
        const order = await Order.findByIdAndUpdate(
          orderId,
          { status: "Completed" },
          { new: true }
        ).session(session);
        if (!order) throw new Error("Order not found");

        console.log("completeOrder 2", order);
        // Fetch customer details
        const customer = await Customer.findById(order.customer_id).session(
          session
        );
        if (!customer) throw new Error("Customer not found");
        console.log("completeOrder 3", customer);
        // Fetch ordered items details including menu information
        const orderedItemsDetails = await OrderedItems.find({
          order_id: orderId,
        })
          .populate("menu_id")
          .session(session);
        console.log("completeOrder 4", orderedItemsDetails);
        // Calculate totals and prepare items for receipt
        let subTotal = 0;
        const items = orderedItemsDetails.map((item) => {
          const itemSubTotal = item.quantity * item.menu_id.price;
          const itemTax = itemSubTotal * 0.1; // Assuming a fixed 10% tax rate for simplicity
          subTotal += itemSubTotal;
          return {
            name: item.menu_id.name,
            quantity: item.quantity,
            price: item.menu_id.price,
            subTotal: itemSubTotal,
            tax: itemTax,
          };
        });
        console.log("completeOrder 5", items);
        const totalTax = subTotal * 0.1; // Example: Applying a 10% tax rate
        const totalAmount = subTotal + totalTax;

        // Create the receipt
        const receipt = await Receipt.create(
          [
            {
              order_id: orderId,
              customer: {
                _id: customer._id,
                name: `${customer.firstName} ${customer.lastName}`,
                phone: customer.phone,
                email: customer.email,
              },
              items: items,
              payment_method: "Credit Card", // This example assumes a static value; adjust as needed
              sub_total: subTotal,
              tax_amount: totalTax,
              total_amount: totalAmount,
              date: new Date(), // The date when the receipt is generated
            },
          ],
          { session }
        );
        console.log("completeOrder 6", receipt);
        await session.commitTransaction();
        session.endSession();

        return { receiptId: receipt[0]._id.toString() };
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error(`Completing order failed: ${error.message}`);
      }
    },
    addCategory: async (_, { category_name, description }) => {
      try {
        const category = new Category({ category_name, description });
        await category.save();
        return category;
      } catch (error) {
        throw new Error('Error adding category');
      }
    },
    updateCategory: async (_, { id, category_name, description }) => {
      try {
        const updatedCategory = await Category.findByIdAndUpdate(
          id,
          { category_name, description },
          { new: true }
        );
        return updatedCategory;
      } catch (error) {
        throw new Error('Error updating category');
      }
    },
    updateCategoryStatus: async (_, { id, status }) => {
      try {
        const updatedCategoryStatus = await Category.updateOne(
          { _id: id },
      { $set: { status } },
      { new: true }
        );
        return updatedCategoryStatus;
      } catch (error) {
        throw new Error('Error updating category status');
      }
    },
    addMenu: async (_, { name, description, price, image, category_name }) => {
      try {
        const menu = new Menu({ name, description, price, image, category_name });
        await menu.save();
        return menu;
      } catch (error) {
        throw new Error('Error adding menu');
      }
    },
    updateMenuItem: async (_, { id, name, description, price, image, category_name }) => {
      try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(
          id,
          { name, description, price, image, category_name },
          { new: true }
        );
        return updatedMenuItem;
      } catch (error) {
        throw new Error('Error updating menu item');
      }
    },
    deleteMenuItem: async (_, { id }) => {
      try {
        const deletedMenuItem = await Menu.findByIdAndDelete(id);
        return deletedMenuItem;
      } catch (error) {
        throw new Error('Error deleting menu item');
      }
    },
    fileUpload: async (_, { file }) => {
      try {
        const { createReadStream, filename, mimetype, encoding } = await file;
        const stream = createReadStream();
        const result = await cloudinary.uploadStream(stream);
        return result.secure_url;
      } catch (error) {
        throw new Error('Error uploading file');
      }
    },
  },
};

export default resolvers;

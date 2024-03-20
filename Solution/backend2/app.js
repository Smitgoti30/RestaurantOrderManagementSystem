console.log("Welcome From this GraphQl App !!!");
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import Customer from "./models/Customer.js";
import Menu from "./models/Menu.js";
import Order from "./models/Order.js";
import OrderedItems from "./models/OrderedItems.js";
import Receipt from "./models/Receipt.js";

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

// Writing Schema in typeDefs
const typeDefs = `
scalar Date
scalar Boolean

type Customer {
  _id: ID
  firstName: String
  lastName: String
  phone: Int
  email: String
  type: String
  password: String
}
type Order {
  _id: ID
  customer_id: ID
  date_time: Date
  status: String
  type: String
  table_number: Int
}

extend type Customer {
  latestOrder: Order
}

input customer_data {
  firstName: String
  lastName: String
  phone: Int
  email: String
  type: String
  password: String
}

input Customer_filters {
  firstName: String
  lastName: String
  email: String
  phone: Int
  status: String
  type: String
  tableNumber: Int
}
type AuthPayload {
  token: String!
  customer: Customer!
}


type Query {
  getCustomer(id: ID!): Customer
  getAllCustomers(filters:customer_data): [Customer]
  getAllCustomersWithLatestOrder(filters: Customer_filters): [Customer]
}

type Mutation {
  createCustomer(customer_details: customer_data): Customer
	deleteCustomer(customer_id: ID!): Customer
	updateCustomer(customer_id: ID!, customer_details: customer_data): Customer
}
`;

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
    getAllCustomersWithLatestOrder: async (_, { filters } = {}) => {
      console.log(filters);
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
        const customers = await Customer.find(customerQuery).lean();
        console.log(customers);
        for (let customer of customers) {
          const latestOrder = await Order.findOne({
            customer_id: customer._id,
            ...orderQuery,
          }).sort({ date_time: -1 });
          customer.latestOrder = latestOrder;
        }

        return customers;
      } catch (error) {
        console.error(error);
        throw new Error("Unable to fetch customers with filters");
      }
    },
  },
  Mutation: {
    createCustomer: async (parent, args, context, info) => {
      try {
        let user;
        if (args.type == "dining") {
          const user = new Customer({
            ...args.customer_details,
          });
          return user;
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
          console.log(hashedPassword);
          user = new Customer({
            ...args.customer_details,
            password: hashedPassword,
          });
        }
        await user.save();
        return user;
      } catch (e) {
        console.log(e);
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
    updateCustomer: async (parent, args, context, info) => {
      const customer = await Customer.findById(args.customer_id);
      if (!customer) {
        throw new Error("Customer not found");
      }

      Object.assign(customer, args.customer_details);
      await customer.save();
      return customer;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

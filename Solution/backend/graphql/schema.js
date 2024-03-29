const typeDefs = `
  scalar Upload
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
  type OrderedItem {
    _id: ID
    menu_id: ID
    quantity: Int
    price: Float
    menuItem: Menu
  }
  type Order {
    _id: ID
    customer_id: ID
    date_time: Date
    status: String
    type: String
    table_number: Int
    items: [OrderedItem]
  }
  type Category {
    _id: ID!
    category_name: String!
    description: String!
    status: Boolean!
  }

  extend type Customer {
    latestOrder: Order
  }

  input OrderInput {
    order_id: ID 
    customer_id: ID!
    date_time: Date
    status: String!
    type: String!
    table_number: Int
  }

  input OrderItemInput {
    menu_id: ID!
    quantity: Int!
    price: Float!
  }

  extend type Mutation {
    createOrder(order: OrderInput, items: [OrderItemInput]): Order
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
  type ReceiptItem {
    name: String!
    quantity: Int!
    price: Float!
    subTotal: Float!
    tax: Float!
  }

  type CustomerInfo {
    _id: ID!
    name: String!
    phone: String
    email: String!
  }

  type Receipt {
    _id: ID
    order_id: ID!
    customer: CustomerInfo!
    items: [ReceiptItem!]!
    payment_method: String!
    sub_total: Float!
    tax_amount: Float!
    total_amount: Float!
    date: Date!
  }

  type CompleteOrderResponse {
    receiptId: ID!
  }

  extend type Mutation {
    completeOrder(orderId: ID!): CompleteOrderResponse!
  }

  type AuthPayload {
    token: String!
    customer: Customer!
  }
  type CompleteOrderResponse {
    receiptId: ID
  }
  type Menu {
    _id: ID
    name: String!
    description: String!
    price: Float!
    image: String!
    category_name: String!
  }
  type MessageResponse {
    success: Boolean!
    message: String!
  }
  
  type SuccessResponse {
    success: Boolean!
  }

  type Query {
    getCustomer(id: ID!): Customer
    getAllCustomers(filters:customer_data): [Customer]
    getAllCustomersWithLatestOrder(filters: Customer_filters): [Customer]

    getAllMenuItems : [Menu]
    getAllCategories: [Category!]!
    getCategory(id: ID!): Category
    getAllMenus: [Menu!]!
    getMenuItem(id: ID!): Menu
      
    getOrderById(id: ID!): Order
    getOrderDetails(id: ID!): Receipt
    getReceiptById(receiptId: ID!): Receipt
    getCustomerOrders(customerId: ID!): [Receipt!]!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    createCustomer(customer_details: customer_data): Customer
    verifyEmail(email: String!): MessageResponse!
    resetPassword(email: String!, verificationCode: String!, newPassword: String!): SuccessResponse!

    deleteCustomer(customer_id: ID!): Customer
    completeOrder(orderId: ID!): CompleteOrderResponse
    updateCustomer(customerId: ID!, customerDetails: customer_data!): Customer
    addCategory(category_name: String!, description: String!): Category!
    
    updateCategory(
      id: ID!
      category_name: String
      description: String
    ): Category
    
    updateCategoryStatus(id: ID!, status: Boolean!): Category
    addMenu(
      name: String!
      description: String!
      price: Float!
      image: String!
      category_name: String!
    ): Menu!

    updateMenuItem(
      id: ID!
      name: String
      description: String
      price: Float
      image: String
      category_name: String
    ): Menu
    deleteMenuItem(id: ID!): Menu
    fileUpload(file: Upload!): String!
  }
`;

export default typeDefs;

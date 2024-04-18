const typeDefs = `
  # Scalar types
  scalar Upload
  scalar Date
  scalar Boolean

  # Customer type
  type Customer {
    _id: ID
    firstName: String
    lastName: String
    phone: Int
    email: String
    type: String
    password: String
    latestOrder: Order
  }

  # OrderedItem type
  type OrderedItem {
    _id: ID
    menu_id: ID
    quantity: Int
    price: Float
    menuItem: Menu
  }

  # Order type
  type Order {
    _id: ID
    customer_id: ID
    date_time: Date
    status: String
    type: String
    table_number: Int
    items: [OrderedItem]
  }

  # Category type
  type Category {
    _id: ID!
    category_name: String!
    description: String!
    status: Boolean!
  }

  # ReceiptItem type
  type ReceiptItem {
    name: String!
    quantity: Int!
    price: Float!
    subTotal: Float!
    tax: Float!
  }

  # CustomerInfo type
  type CustomerInfo {
    _id: ID!
    name: String!
    phone: String
    email: String!
  }

  # Receipt type
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

  # CompleteOrderResponse type
  type CompleteOrderResponse {
    receiptId: ID!
  }

  # AuthPayload type
  type AuthPayload {
    token: String!
    customer: Customer!
  }

  # Menu type
  type Menu {
    _id: ID
    name: String!
    description: String!
    price: Float!
    image: String!
    category_name: String!
  }

  # MessageResponse type
  type MessageResponse {
    success: Boolean!
    message: String!
  }

  # SuccessResponse type
  type SuccessResponse {
    success: Boolean!
  }

  # Input types
  input OrderInput {
    order_id: ID 
    customer_id: ID
    date_time: Date
    status: String
    type: String
    table_number: Int
    total:Int
  }

  input OrderItemInput {
    menu_id: ID
    quantity: Int
    price: Float
    name:String
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

  input ProductInput {
    name: String!
    amount: Int!
    quantity: Int!
  }

  type CheckoutSession {
    id: ID!
  }

  # Queries
  type Query {
    getCustomer(id: ID!): Customer
    getAllCustomers(filters: customer_data): [Customer]
    getAllCustomersWithLatestOrder(filters: Customer_filters): [Customer]
    getAllMenuItems: [Menu]
    getAllCategories: [Category!]!
    getCategory(id: ID!): Category
    getAllMenus: [Menu!]!
    getMenuItem(id: ID!): Menu
    getOrderById(id: ID!): Order
    getOrderDetails(id: ID!): Receipt
    getReceiptById(receiptId: ID!): Receipt
    getCustomerOrders(customerId: ID!): [Receipt!]!
  }

  # Mutations
  type Mutation {
    createCheckoutSession(products: [ProductInput]): CheckoutSession
    login(email: String!, password: String!): AuthPayload
    createCustomer(customer_details: customer_data): Customer
    verifyEmail(email: String!): MessageResponse!
    resetPassword(email: String!, verificationCode: String!, newPassword: String!): SuccessResponse!
    deleteCustomer(customer_id: ID!): Customer
    completeOrder(orderId: ID!): CompleteOrderResponse
    updateCustomer(customerId: ID!, customerDetails: customer_data!): Customer
    addCategory(category_name: String!, description: String!): Category!


    createOrder(order: OrderInput, items: [OrderItemInput]): Order
    
    
    updateCategory(id: ID!, category_name: String, description: String): Category
    updateCategoryStatus(id: ID!, status: Boolean!): Category
    addMenu(name: String!, description: String!, price: Float!, image: String!, category_name: String!): Menu!
    updateMenuItem(id: ID!, name: String, description: String, price: Float, image: String, category_name: String): Menu
    deleteMenuItem(id: ID!): Menu
    fileUpload(file: Upload!): String!
  }
`;

export default typeDefs;

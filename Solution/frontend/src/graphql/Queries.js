import { gql } from "@apollo/client";

export const GET_ALL_CUSTOMERS = gql`
  query GetAllCustomers {
    getAllCustomers {
      _id
      firstName
      lastName
      email
      phone
      password
    }
  }
`;

export const GET_CUSTOMER_DETAILS = gql`
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      _id
      firstName
      lastName
      email
      phone
      type
    }
  }
`;
export const getAllMenuItems = gql`
  query getAllMenuItems {
    getAllMenuItems {
      _id
      name
    }
  }
`;

export const GET_ALL_CUSTOMERS_WITH_LATEST_ORDER = gql`
  query GetAllCustomersWithLatestOrder {
    getAllCustomersWithLatestOrder {
      _id
      firstName
      lastName
      email
      phone
      latestOrder {
        _id
        date_time
        status
        type
        table_number
      }
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($id: ID!) {
    getOrderById(id: $id) {
      _id
      date_time
      status
      type
      table_number
      items {
        menu_id
        quantity
        price
      }
    }
  }
`;
export const GET_ORDER_DETAILS = gql`
  query getOrderDetails($id: ID!) {
    getOrderDetails(id: $id) {
      _id
      order_id
      customer {
        _id
        name
        phone
        email
      }
      items {
        name
        quantity
        price
        subTotal
        tax
      }
      payment_method
      sub_total
      tax_amount
      total_amount
      date
    }
  }
`;

export const GET_RECEIPT_BY_ID = gql`
  query GetReceiptById($receiptId: ID!) {
    getReceiptById(receiptId: $receiptId) {
      _id
      order_id
      customer {
        _id
        name
        phone
        email
      }
      items {
        name
        quantity
        price
        subTotal
        tax
      }
      payment_method
      sub_total
      tax_amount
      total_amount
      date
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  query GetCustomerOrders($customerId: ID!) {
    getCustomerOrders(customerId: $customerId) {
      _id
      order_id
      customer {
        _id
        name
        phone
        email
      }
      items {
        name
        quantity
        price
        subTotal
        tax
      }
      payment_method
      sub_total
      tax_amount
      total_amount
      date
    }
  }
`;

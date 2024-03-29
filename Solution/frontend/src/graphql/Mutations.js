import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
  mutation Mutation($customerInput: customer_data) {
    createCustomer(customer_details: $customerInput) {
      firstName
      lastName
      phone
      email
      type
      password
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      customer {
        _id
        firstName
        lastName
        email
        type
      }
    }
  }
`;
export const VERIFY_EMAIL = gql`
  mutation verifyEmail($email: String!) {
    verifyEmail(email: $email) {
      success
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $email: String!
    $verificationCode: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      verificationCode: $verificationCode
      newPassword: $newPassword
    ) {
      success
    }
  }
`;
export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($customer_id: ID!) {
    deleteCustomer(customer_id: $customer_id) {
      _id
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($order: OrderInput, $items: [OrderItemInput]) {
    createOrder(order: $order, items: $items) {
      _id
      status
      type
      table_number
    }
  }
`;

export const COMPLETE_ORDER = gql`
  mutation CompleteOrder($orderId: ID!) {
    completeOrder(orderId: $orderId) {
      receiptId
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($customerId: ID!, $customerDetails: customer_data!) {
    updateCustomer(customerId: $customerId, customerDetails: $customerDetails) {
      _id
      firstName
      lastName
      email
      phone
    }
  }
`;

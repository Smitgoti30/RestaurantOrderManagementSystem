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

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($customer_id: ID!) {
    deleteCustomer(customer_id: $customer_id) {
      _id
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation Mutation($customer_id: ID!, $customer_details: customer_data) {
    updateCustomer(
      customer_id: $customer_id
      customer_details: $customer_details
    ) {
      firstName
      lastName
      phone
    }
  }
`;

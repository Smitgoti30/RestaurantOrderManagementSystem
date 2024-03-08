import { gql } from "@apollo/client";

export const ADD_CUSTOMER = gql`
  mutation AddCustomer($customerInput: customer_data!) {
    addCustomer(input: $customerInput) {
      _id
      firstName
      lastName
      phone
      email
      type
    }
  }
`;
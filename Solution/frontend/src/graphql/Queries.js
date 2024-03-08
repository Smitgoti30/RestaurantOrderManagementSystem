import { gql } from "@apollo/client";

export const GET_ALL_CUSTOMERS = gql`
  query GetAllCustomers {
    getAllCustomers {
      _id
      firstName
      lastName
      email
      phone
    }
  }
`;
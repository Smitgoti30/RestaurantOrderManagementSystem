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

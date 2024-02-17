console.log("Welcome From this GraphQl App !!!");
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import Customer from "./models/Customer.js";

// Writing Schema in typeDefs
const typeDefs = `
scalar Date
scalar Boolean

type Customer {
    _id: ID
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    type: String,
    password: String,
}
input customer_data {
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    type: String,
    password: String,
}

type Query {
    getAllCustomers(filters:customer_data): [Customer]
}

type Mutation{}
`;

const resolvers = {
  Query: {
    getAllCustomers: async (parent, args, context, info) => {
      try {
        return await Customer.find({});
      } catch (error) {
        throw new Error("Unable to fetch customers");
      }
    },
  },
  Mutation: {
    addCustomer: async (parent, { input }, context, info) => {
      try {
        const newCustomer = new Customer(input);
        await newCustomer.save();
        return newCustomer;
      } catch (error) {
        throw new Error("Unable to add customer");
      }
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

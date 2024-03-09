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
  firstName: String
  lastName: String
  phone: Int
  email: String
  type: String
  password: String
}
input customer_data {
  firstName: String
  lastName: String
  phone: Int
  email: String
  type: String
  password: String
}

type Query {
  getAllcustomers(filters:customer_data): [Customer]
}

type Mutation{
  createCustomer(customer_details: customer_data): Customer
	deleteCustomer(customer_id: ID!): Customer
	updateCustomer(customer_id: ID!, customer_details: customer_data): Customer
}
`;

const resolvers = {
  Query: {
    getAllcustomers: async (parent, args, context, info) => {
      try {
        return await Customer.find({});
      } catch (error) {
        throw new Error("Unable to fetch customers");
      }
    },
  },
  Mutation: {
    createCustomer: async (parent, args, context, info) => {
      console.log(args);
			const user = new Customer({
				...args.customer_details
			});
			await user.save();
			return user;
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

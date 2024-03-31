require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const dbConnect = require('./database/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false, 
});

async function startServer() {
  await dbConnect(); 

  await server.start();

  server.applyMiddleware({ app, path: '/'  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

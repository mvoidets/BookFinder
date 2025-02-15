const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const cors = require('cors'); // Import cors package
//const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs, resolvers
});

const startApolloServer = async () => {
  await server.start();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//app.use(routes);

db.once('open', () => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
};

startApolloServer();

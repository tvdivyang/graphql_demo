const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const dbconnect = require("./config/db");
dbconnect();
const typeDefs = require("./schema/schema");
// const User = require("./models/User");
// const quote = require("./models/Quotes");
const resolvers = require("./resolvers");
const JWT_SECRET = "token";
const jwt = require("jsonwebtoken");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { userId } = jwt.verify(authorization, JWT_SECRET);
      return { userId };
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(3000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

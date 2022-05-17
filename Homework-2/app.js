const { GraphQLServer, PubSub } = require("graphql-yoga");
const { resolvers } = require("./Resolvers/resolvers.js");
const { typeDefs } = require("./Types/typeDefs.js");

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log("Server iss running"));

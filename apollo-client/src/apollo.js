import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
// eslint-disable-next-line no-unused-vars
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// eslint-disable-next-line no-unused-vars
import { createClient } from "graphql-ws";

const wsLink = new WebSocketLink({
  uri: "ws://0.0.0.0:4000/graphql",
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: "http://0.0.0.0:4000/graphql",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

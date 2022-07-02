import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  uri: "http://localhost:4002/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
    //   authorization: token ? `${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

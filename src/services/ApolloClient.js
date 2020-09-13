import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "apollo-boost";

const httpLink = new HttpLink({
  // uri: "https://gexus.com.br/graphql",
  uri: "http://localhost:5000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  operation.setContext({
    headers: {
      "x-auth-acc": token ? `${token}` : "",
    },
  });

  return forward(operation);
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "apollo-boost";

const httpLink = new HttpLink({ uri: "https://macsucatas.gexus.com.br/" });

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

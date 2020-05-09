import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import client from "./services/ApolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./App/App";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

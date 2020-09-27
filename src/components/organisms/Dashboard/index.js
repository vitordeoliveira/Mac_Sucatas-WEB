import React from "react";
import { Notes, Sell, Buy, Clients, Product, Main, Worker } from "./Content";
import { useParams } from "react-router-dom";

const Index = () => {
  const { id } = useParams();

  switch (id) {
    case "product":
      return <Product></Product>;
    case "fornecedor":
      return <Clients type="Fornecedor"></Clients>;
    case "comprador":
      return <Clients type="Comprador"></Clients>;
    case "buy":
      return <Buy></Buy>;
    case "sell":
      return <Sell></Sell>;
    case "notes":
      return <Notes></Notes>;
    case "funcionarios":
      return <Worker></Worker>;

    default:
      return <Main></Main>;
  }
};

export default Index;

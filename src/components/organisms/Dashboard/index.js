import React from "react";
import Main from "./Main";
import Product from "./Product";
import Clients from "./Clients";
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

    default:
      return <Main></Main>;
  }
};

export default Index;

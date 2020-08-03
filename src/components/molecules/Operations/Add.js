import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import List from "../../atoms/Operation/List";

const GETPRODUCTS = gql`
  {
    getProduct {
      id
      name
    }
  }
`;

export default function Add({ provider, onsubmit }) {
  const { state, dispatch } = provider;
  const { loading, data } = useQuery(GETPRODUCTS);

  useEffect(() => {
    if (!loading) {
      const arr = data.getProduct;
      const newarr = arr.map((item) => {
        return {
          id: item.id,
          name: item.name,
          value: "",
          amount: "",
          added: false,
        };
      });
      dispatch({
        type: "LOAD_PRODUCTS",
        payload: {
          products: newarr,
        },
      });
    }
  }, [data, loading, dispatch]);

  const onadd = (index, value, amount) => {
    if (value !== "" && amount !== "") {
      const actual = state.products;
      const obj = {
        ...actual[index],
        value,
        amount,
        added: !actual[index].added,
      };
      actual[index] = obj;

      dispatch({
        type: "LOAD_PRODUCTS",
        payload: {
          products: actual,
        },
      });
    }
  };

  return (
    <Wrapper>
      <Text>Adicionar produtos a nota</Text>
      <Button onClick={onsubmit}>Finalizar</Button>

      {state.products &&
        state.products.map((item, index) => (
          <List key={item.id} item={item} index={index} onadd={onadd}></List>
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.h1``;

const Button = styled.div`
  padding: 10px;
  background: rgb(90, 200, 90);
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;

  :hover {
    box-shadow: 0 0 1px black;
  }
`;

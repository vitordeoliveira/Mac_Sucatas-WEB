import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GETPRODUCTS = gql`
  {
    getProduct {
      id
      name
      stock
      balanceStock
    }
  }
`;

export default function SelectClients({ provider, type }) {
  const { state, dispatch } = provider;
  const { loading, data } = useQuery(GETPRODUCTS);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Wrapper>
      <Text>
        Selecione o produto que irá {type === "1" ? "COMPRAR" : "VENDER"}
      </Text>
      {data.getProduct.map((item) => (
        <Item
          key={item.id}
          selected={state.product === item.id}
          onClick={() => {
            dispatch({ type: "SELECT_PRODUCT", payload: { id: item.id } });
          }}
        >
          {item.name}
        </Item>
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

const Text = styled.h3`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  text-align: center;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 10px 0;
  margin: 2px 0;
  width: 80%;
  border-radius: 15px;

  ${(props) =>
    props.selected ? `border: 1px solid; font-weight: bold;` : null}

  :hover {
    border: 1px solid;
  }
`;

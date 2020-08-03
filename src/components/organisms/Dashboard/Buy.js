import React, { useReducer, useMemo } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { SelectClient, Add } from "../../molecules/Operations";

const ADDPURCHASE = gql`
  mutation addPurchase(
    $productId: ID!
    $clientId: ID!
    $value: Float!
    $amount: Float!
  ) {
    addPurchase(
      productId: $productId
      clientId: $clientId
      value: $value
      amount: $amount
    ) {
      operation {
        id
      }
    }
  }
`;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SELECT_CLIENT":
      return {
        ...state,
        client: payload.id,
        screen: 2,
      };
    case "LOAD_PRODUCTS":
      return {
        ...state,
        products: payload.products,
      };
    default:
      return false;
  }
};

const Buy = () => {
  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, {
    screen: 1,
    client: null,
    products: [{ name: null, value: "", amount: "", added: false }],
  });

  const provider = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const [fetch] = useMutation(ADDPURCHASE);

  const onsubmit = async () => {
    try {
      await provider.state.products
        .filter((item) => item.added === true)
        .forEach(
          async (item) =>
            await fetch({
              variables: {
                productId: item.id,
                clientId: state.client,
                value: Number(item.value),
                amount: Number(item.amount),
              },
            })
        );

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (provider.state.screen === 1) {
    return <SelectClient provider={provider} type="1"></SelectClient>;
  }

  if (provider.state.screen === 2) {
    return <Add provider={provider} onsubmit={onsubmit}></Add>;
  }
};

export default Buy;

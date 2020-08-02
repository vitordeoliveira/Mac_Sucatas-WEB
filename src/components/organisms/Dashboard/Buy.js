import React, { useReducer, useMemo } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { SelectProduct, SelectClient, Add } from "../../molecules/Operations";

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
    case "SELECT_PRODUCT":
      return {
        ...state,
        product: payload.id,
      };
    case "CHANGE_VALUES":
      return {
        ...state,
        value: payload.value,
        amount: payload.amount,
        screen: 3,
      };

    default:
      return false;
  }
};

const Buy = () => {
  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, {
    screen: 1,
    product: null,
    client: null,
    value: null,
    amount: null,
  });

  const provider = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const [fetch] = useMutation(ADDPURCHASE);

  const onsubmit = async () => {
    try {
      await fetch({
        variables: {
          productId: state.product,
          clientId: state.client,
          value: Number(state.value),
          amount: Number(state.amount),
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (provider.state.screen === 1) {
    return (
      <SelectClient
        provider={provider}
        onsubmit={onsubmit}
        type="1"
      ></SelectClient>
    );
  }

  if (provider.state.screen === 2) {
    return <SelectProduct provider={provider} type="1"></SelectProduct>;
  }

  if (provider.state.screen === 3) {
    return <Add provider={provider}></Add>;
  }
};

export default Buy;

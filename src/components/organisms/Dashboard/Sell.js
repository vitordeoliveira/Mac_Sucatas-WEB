import React, { useReducer, useMemo } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { SelectProduct, SelectClient, Add } from "../../molecules/Operations";

const ADDSALE = gql`
  mutation addSale(
    $productId: ID!
    $clientId: ID!
    $value: Float!
    $amount: Float!
  ) {
    addSale(
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
    case "SELECT_PRODUCT":
      return {
        ...state,
        product: payload.id,
        screen: 2,
      };
    case "SELECT_CLIENT":
      return {
        ...state,
        client: payload.id,
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

  const [fetch] = useMutation(ADDSALE);

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
    return <SelectProduct provider={provider} type="2"></SelectProduct>;
  }

  if (provider.state.screen === 2) {
    return <Add provider={provider}></Add>;
  }

  if (provider.state.screen === 3) {
    return (
      <SelectClient
        provider={provider}
        onsubmit={onsubmit}
        type="2"
      ></SelectClient>
    );
  }
};

export default Buy;

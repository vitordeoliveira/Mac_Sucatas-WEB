import React, { useReducer, useMemo } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { SelectClient, Add } from "../../../molecules/Operations";

const ADDPURCHASENOTE = gql`
  mutation addPurchaseNote(
    $clientId: ID
    $additional: Float
    $discount: Float
    $operation: [OperationsInput]
  ) {
    addPurchaseNote(
      clientId: $clientId
      additional: $additional
      discount: $discount
      operation: $operation
    ) {
      total
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
    case "ADDITIONAL":
      return {
        ...state,
        additional: {
          value: payload.value,
          lock: payload.lock,
        },
      };
    case "DISCOUNT":
      return {
        ...state,
        discount: {
          value: payload.value,
          lock: payload.lock,
        },
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
    additional: { value: 0, lock: false },
    discount: { value: 0, lock: false },
    products: [{ name: null, value: "", amount: "", added: false }],
  });

  const provider = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  const [fetch] = useMutation(ADDPURCHASENOTE);

  const onsubmit = async () => {
    try {
      const operation = provider.state.products
        .filter((item) => item.added === true)
        .map((item) => {
          const value = item.value.replace(",", ".");
          const amount = item.amount.replace(",", ".");
          return {
            productId: item.id,
            value: Number(value),
            amount: Number(amount),
          };
        });

      await fetch({
        variables: {
          clientId: state.client,
          additional: Number(state.additional.value),
          discount: Number(state.discount.value),
          operation,
        },
      });

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

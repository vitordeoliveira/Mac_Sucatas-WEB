import React, { useReducer, useMemo } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { SelectClient, Add } from "../../../molecules/Operations";

const ADDSALENOTE = gql`
  mutation addSaleNote(
    $clientId:ID 
    $additional: Float
    $discount: Float
    $operation: [OperationsInput]  
  ) {
    addSaleNote(
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

  const [fetch] = useMutation(ADDSALENOTE);

  const onsubmit = async () => {
    try {
      const operation = provider.state.products
        .filter((item) => item.added === true)
        .map(item => ({productId:item.id,value:Number(item.value), amount:Number(item.amount)}))

        
      await fetch({
        variables:{
          clientId: state.client,
          additional: 0,
          discount: 0,
          operation
        }
      })

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (provider.state.screen === 1) {
    return <SelectClient provider={provider} type="2"></SelectClient>;
  }

  if (provider.state.screen === 2) {
    return <Add provider={provider} onsubmit={onsubmit}></Add>;
  }
};

export default Buy;

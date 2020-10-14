import React, { useMemo, useReducer, useEffect } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import Input from "../../atoms/Notes/Input";
import List from "./UpdateList";

const UPDATENOTE = gql`
  mutation updateNote(
    $noteId: ID
    $type: ID
    $clientId: ID
    $additional: Float
    $discount: Float
    $operation: [OperationsInput]
  ) {
    updateNote(
      noteId: $noteId
      type: $type
      clientId: $clientId
      additional: $additional
      discount: $discount
      operation: $operation
    ) {
      id
    }
  }
`;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_DISCOUNT":
      return {
        ...state,
        discount: payload.discount,
      };
    case "SET_ADDITIONAL":
      return {
        ...state,
        additional: payload.additional,
      };
    case "SET_TOTAL":
      return {
        ...state,
        total: payload.total,
      };
    case "SET_OPERATION_VALUE": {
      const arr = state.operations;
      arr[payload.index].value = payload.value;

      let sum = 0;
      for (let i = 0; i < state.operations.length; i++) {
        const { value, amount } = state.operations[i];
        sum = sum + Number(value) * Number(amount);
      }
      sum = sum - Number(state.discount) + Number(state.additional);

      return {
        ...state,
        operations: arr,
        total: sum,
      };
    }

    case "SET_OPERATION_AMOUNT": {
      const arr = state.operations;
      arr[payload.index].amount = payload.amount;

      let sum = 0;
      for (let i = 0; i < state.operations.length; i++) {
        const { value, amount } = state.operations[i];
        sum = sum + Number(value) * Number(amount);
      }
      sum = sum - Number(state.discount) + Number(state.additional);

      return {
        ...state,
        operations: arr,
        total: sum,
      };
    }
    default:
      return false;
  }
};

function Update({ provider, refetch }) {
  const { state, dispatch } = provider;
  const { note } = state;
  const [fetch] = useMutation(UPDATENOTE);

  const [stateUpdate, dispatchUpdate] = useReducer(reducer, {
    additional: note.additional,
    discount: note.discount,
    total: note.total,
    operations: note.Operations,
  });

  const providerUpdate = useMemo(() => ({ stateUpdate, dispatchUpdate }), [
    stateUpdate,
    dispatchUpdate,
  ]);

  const {
    additional,
    discount,
    total,
    operations,
  } = providerUpdate.stateUpdate;

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < operations.length; i++) {
      const { value, amount } = operations[i];
      sum = sum + Number(value) * Number(amount);
    }
    sum = sum - Number(discount) + Number(additional);

    dispatchUpdate({
      type: "SET_TOTAL",
      payload: { total: sum },
    });
  }, [operations, additional, discount, dispatchUpdate]);

  const onsubmit = async () => {
    const treat_operations = operations.map((item) => {
      return {
        productId: item.Products.id,
        value: Number(item.value),
        amount: Number(item.amount),
      };
    });

    await fetch({
      variables: {
        noteId: note.id,
        type: note.type,
        clientId: note.Clients.id,
        additional: Number(additional),
        discount: Number(discount),
        operation: treat_operations,
      },
    });

    refetch();

    dispatch({ type: "BACK" });
  };

  return (
    <Wrapper>
      <Value>
        Operação: {note.type === "1" ? <Buy>Compra</Buy> : <Sell>Venda</Sell>}
      </Value>
      <Value>Empresa: {note.Companies.name}</Value>
      <Value>Cliente: {note.Clients.name}</Value>
      <Item>
        <Paragraph>Produto</Paragraph>
        <Paragraph>Quantidade</Paragraph>
        <Paragraph>Valor</Paragraph>
        <Paragraph>Total</Paragraph>
      </Item>
      {operations.map((item, index) => (
        <List
          key={index}
          item={item}
          index={index}
          dispatch={providerUpdate.dispatchUpdate}
        ></List>
      ))}
      <Input
        prefix={"Desconto: R$"}
        value={discount}
        onChange={(e) =>
          providerUpdate.dispatchUpdate({
            type: "SET_DISCOUNT",
            payload: { discount: e.target.value.replace(",", ".") },
          })
        }
      ></Input>
      <Input
        prefix={"Adicional: R$"}
        value={additional}
        onChange={(e) =>
          providerUpdate.dispatchUpdate({
            type: "SET_ADDITIONAL",
            payload: { additional: e.target.value.replace(",", ".") },
          })
        }
      ></Input>
      <Value>Total: R$ {total}</Value>

      <Button red onClick={(e) => dispatch({ type: "BACK" })}>
        Cancelar
      </Button>
      <Button onClick={onsubmit}>Atualizar Nota</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 30px auto;
  padding: 30px;
  width: 100%;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  aling-items: center;
`;

const Value = styled.p`
  text-align: center;
`;

const Paragraph = styled.p`
  text-align: center;
  width: 25%;
`;

const Buy = styled.span`
  color: red;
`;

const Sell = styled.span`
  color: green;
`;

const Button = styled.div`
  padding: 10px;
  background: ${(props) =>
    props.red ? "rgb(200, 90, 90)" : "rgb(90, 200, 90)"};
  border-radius: 10px;
  cursor: pointer;
  margin: 10px auto;
  width: 150px;
  font-size: 15px;
  text-align: center;

  :hover {
    box-shadow: 0 0 1px black;
  }
`;

export default Update;

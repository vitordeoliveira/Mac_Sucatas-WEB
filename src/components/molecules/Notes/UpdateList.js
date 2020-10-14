import React from "react";
import Input from "../../atoms/Notes/Input";
import styled from "styled-components";

function UpdateList({ item, index, dispatch }) {
  return (
    <Item key={item.id}>
      <Paragraph>{item.Products.name}</Paragraph>
      <Input
        value={item.amount}
        sufix={" kg"}
        onChange={(e) => {
          dispatch({
            type: "SET_OPERATION_AMOUNT",
            payload: { index: index, amount: e.target.value },
          });
        }}
      ></Input>
      <Input
        prefix={"R$"}
        value={item.value}
        sufix={"/kg"}
        onChange={(e) => {
          dispatch({
            type: "SET_OPERATION_VALUE",
            payload: { index: index, value: e.target.value },
          });
        }}
      ></Input>
      <Paragraph>R$ {item.amount * item.value}</Paragraph>
    </Item>
  );
}

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  aling-items: center;
`;

const Paragraph = styled.p`
  text-align: center;
  width: 25%;
`;
export default UpdateList;

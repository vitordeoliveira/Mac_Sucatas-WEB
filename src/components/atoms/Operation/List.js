import React, { useState } from "react";
import styled from "styled-components";

import Input from "./Input";

function OperationList({ item, index, onadd }) {
  const [value, setValue] = useState(item.value);
  const [amount, setAmount] = useState(item.amount);

  return (
    <Wrapper>
      <Name>{item.name}</Name>
      <Input
        disabled={item.added}
        prefix={"R$"}
        value={value}
        sufix={"/Kg"}
        onChange={(e) => setValue(e.target.value)}
      ></Input>
      <Input
        disabled={item.added}
        value={amount}
        sufix={"Kg"}
        onChange={(e) => setAmount(e.target.value)}
      ></Input>
      <Button added={item.added} onClick={() => onadd(index, value, amount)}>
        {item.added ? "Finalizado" : "Adicionar"}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 50px;
  margin: 5px;
  justify-content: space-around;
  border: 1px solid gray;
  margin: 5px 0;
  border-radius: 15px;
  transition: all 0.3s;
  width: 90%;
  align-items: center;

  :hover {
    border: 0;
    box-shadow: 0 0 3px rgb(50, 50, 50);
  }
`;

const Name = styled.p`
  font-size: 1rem;
`;

const Button = styled.div`
  padding: 10px;
  background: ${(props) =>
    props.added ? "rgb(200, 90, 90)" : "rgb(90, 200, 90)"};
  border-radius: 10px;
  cursor: pointer;

  :hover {
    box-shadow: 0 0 1px black;
  }
`;

export default OperationList;

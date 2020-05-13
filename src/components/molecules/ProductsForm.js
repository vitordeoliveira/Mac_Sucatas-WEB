import React, { useState } from "react";
import styled from "styled-components";
// import Loading from "../atoms/Loading";

import Button from "../atoms/Button";

function ProductsForm({ Add, refresh }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [balanceStock, setBalanceStock] = useState("");
  const onclick = async () => {
    await Add({
      variables: {
        name,
        stock: Number(stock),
        balanceStock: Number(balanceStock.replace(",", ".")),
      },
    });
    refresh();
    setName("");
    setStock("");
    setBalanceStock("");
  };

  return (
    <Wrapper>
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Nome"
      ></Input>
      <Input
        onChange={(e) => setStock(e.target.value)}
        value={stock}
        placeholder="Estoque"
      ></Input>
      <Input
        onChange={(e) => setBalanceStock(e.target.value)}
        value={balanceStock}
        placeholder="Balanço"
      ></Input>
      <Button onClick={onclick}>Enviar</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 60%;
  max-height: 355px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 70px 0;
`;

const Input = styled.input`
  border-radius: 50px;
  border: 0;
  height: 35px;
  padding: 0 50px;
  border: 2px solid #2c6126;
  text-align: center;
  font-size: 15px;

  :focus {
    outline-width: 0;
  }

  ::placeholder {
    letter-spacing: 2px;
  }
`;

export default ProductsForm;

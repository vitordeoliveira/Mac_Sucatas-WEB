import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Loading from "../atoms/Loading";

import Button from "../../atoms/Button";

function Adder({ add, provider, products }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [balanceStock, setBalanceStock] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const onclick = () => {
    const exist = products.data.getProduct
      .map((item) => item.name.toUpperCase())
      .includes(name.toUpperCase());

    if (name === "") return setError("Nome do produto não pode ser vazio");
    if (exist) return setError("Produto já cadastrado");

    add(name, stock, balanceStock);
    setName("");
    setStock("");
    setBalanceStock("");
  };

  return (
    <>
      <Title>
        ADICIONAR{" "}
        {provider.adder ? (
          <Close
            onClick={() => {
              provider.setAdder(false);
            }}
          >
            +
          </Close>
        ) : null}
      </Title>
      <Error>{error}</Error>
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
          placeholder={`Balan\u00e7o`}
        ></Input>
        <Button onClick={onclick}>Enviar</Button>
      </Wrapper>
    </>
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
  margin: 50px 0;
`;

const Title = styled.h1`
  color: rgb(50, 50, 50);
  display: flex;
  align-items: center;
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

const Close = styled.span`
  display: none;
  @media (max-width: 465px) {
    font-size: 50px;
    cursor: pointer;
    margin-left: 8px;
    color: rgb(150, 90, 90);
    transform: rotate(45deg);
    display: block;
  }
`;

const Error = styled.p`
  color: red;
  text-align: center;
  width: 100%;
`;

export default Adder;

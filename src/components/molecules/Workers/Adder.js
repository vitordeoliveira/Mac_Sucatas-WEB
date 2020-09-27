import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import Button from "../../atoms/Button";

const ADDWORKER = gql`
  mutation addWorker($name: String!, $phone: String) {
    addWorker(name: $name, phone: $phone) {
      name
    }
  }
`;

function Adder({ refetch, provider }) {
  const [fetch] = useMutation(ADDWORKER);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const onclick = async () => {
    try {
      setLoading(true);
      await fetch({
        variables: { name, phone },
      });
      refetch();
      setLoading(false);
      setName("");
      setPhone("");
      provider.dispatch((state) => ({ ...state, add: false, option: false }));
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  return (
    <>
      <Title>
        ADICIONAR{" "}
        {provider.state.add ? (
          <Close
            onClick={() => {
              provider.dispatch((state) => ({
                ...state,
                add: false,
                option: false,
              }));
            }}
          >
            +
          </Close>
        ) : null}
      </Title>
      <Wrapper>
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Nome"
        ></Input>
        <Input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          placeholder={"Telefone"}
        ></Input>
        <Button onClick={onclick}>{loading ? "loading" : "Enviar"}</Button>
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
  margin: 70px 0;
`;

const Title = styled.h1`
  color: rgb(50, 50, 50);
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
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

export default Adder;

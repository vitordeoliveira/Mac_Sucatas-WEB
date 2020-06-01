import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

// import Loading from "../atoms/Loading";

import Button from "../../atoms/Button";

const ADDCLIENTS = gql`
  mutation addClient(
    $type: ID!
    $name: String!
    $email: String
    $phone: String
  ) {
    addClient(type: $type, name: $name, email: $email, phone: $phone) {
      name
    }
  }
`;

function Adder({ type, refetch }) {
  const [fetch] = useMutation(ADDCLIENTS);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const typecode = type === "Fornecedor" ? 1 : 2;

  const onclick = async () => {
    try {
      const { data } = await fetch({
        variables: { type: typecode, name, email, phone },
      });
      console.log(data);
      refetch();
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <Title>ADICIONAR</Title>
      <Wrapper>
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Nome"
        ></Input>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="e-mail"
        ></Input>
        <Input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          placeholder={"Telefone"}
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
  margin: 70px 0;
`;

const Title = styled.h1`
  color: rgb(50, 50, 50);
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

export default Adder;

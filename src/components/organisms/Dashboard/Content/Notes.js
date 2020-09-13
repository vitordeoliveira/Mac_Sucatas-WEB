import React, { useEffect } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import List from "../../../molecules/Notes/List";

const GETNOTE = gql`
  {
    getNotes {
      id
      type
      additional
      discount
      Companies {
        name
      }
      Users {
        name
      }
      Clients {
        name
      }
      total
      Operations {
        value
        amount
        Products {
          name
        }
      }
    }
  }
`;

function Notes() {
  const { loading, data, refetch } = useQuery(GETNOTE);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <Wrapper>
      <Header>
        <Title>Empresa</Title>
        <Title>Usuário</Title>
        <Title>Adicional</Title>
        <Title>Desconto</Title>
        <Title>Cliente</Title>
        <Title>Tipo</Title>
        <Title>Total</Title>
        <Title>Imprimir</Title>
      </Header>
      {data.getNotes
        .map((item) => <List key={item.id} note={item}></List>)
        .reverse()}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px 0;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 770px) {
    width: 95%;
  }
`;

const Title = styled.h3`
  text-align: center;
  width: 14%;

  @media (max-width: 770px) {
    font-size: 15px;
  }

  @media (max-width: 465px) {
    font-size: 10px;
  }
`;

export default Notes;

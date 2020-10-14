import React, { useEffect, useReducer, useMemo } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import List from "../../../molecules/Notes/List";
import Update from "../../../molecules/Notes/Update";

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
        id
        name
      }
      total
      Operations {
        value
        amount
        Products {
          id
          name
        }
      }
    }
  }
`;

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_NOTE":
      return {
        ...state,
        note: payload.note,
        update: true,
      };
    case "BACK":
      return {
        ...state,
        note: null,
        update: false,
      };
    default:
      return false;
  }
};

function Notes() {
  const { loading, data, refetch } = useQuery(GETNOTE);

  const [state, dispatch] = useReducer(reducer, {
    note: null,
    update: false,
  });

  const provider = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <h1>loading</h1>;
  }

  if (state.update) {
    return <Update provider={provider}></Update>;
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
        <Option>Editar</Option>
        <Option>Print</Option>
      </Header>
      {data.getNotes
        .map((item) => (
          <List
            key={item.id}
            note={item}
            onUpdate={(note) => {
              dispatch({ type: "UPDATE_NOTE", payload: { note: note } });
            }}
          ></List>
        ))
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

const Option = styled(Title)`
  width: 8%;
`;

export default Notes;

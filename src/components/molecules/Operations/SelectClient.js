import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GETCLIENTS = gql`
  {
    getClients {
      id
      type
      name
      email
      phone
    }
  }
`;
export default function SelectClients({ provider, onsubmit, type }) {
  const { state, dispatch } = provider;
  const { loading, data } = useQuery(GETCLIENTS);

  if (loading) {
    return <div>loading...</div>;
  }

  const filter = data.getClients.filter((item) => {
    return item.type === type;
  });

  return (
    <Wrapper>
      <Text>Selecione o {type === "2" ? "Comprador" : "Fornecedor"}</Text>
      {filter.map((item) => (
        <Item
          key={item.id}
          selected={state.client === item.id}
          onClick={() => {
            dispatch({ type: "SELECT_CLIENT", payload: { id: item.id } });
          }}
        >
          {item.name}
        </Item>
      ))}
      {state.client ? (
        <Button onClick={onsubmit}>Finalizar venda</Button>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.h3`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  text-align: center;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 10px 0;
  margin: 2px 0;
  width: 80%;
  border-radius: 15px;

  ${(props) =>
    props.selected ? `border: 1px solid; font-weight: bold;` : null}

  :hover {
    border: 1px solid;
  }
`;

const Button = styled.div`
  margin-top: 100px;
  padding: 10px;
  background: rgb(90, 200, 90);
  border-radius: 10px;
  cursor: pointer;

  :hover {
    box-shadow: 0 0 1px black;
  }
`;

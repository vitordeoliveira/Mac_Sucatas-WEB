import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Filter from "../../atoms/Operation/Filter";

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
  const [filterList, setFilterlist] = useState(null);

  if (loading) {
    return <div>loading...</div>;
  }

  const clients = data.getClients.filter((item) => {
    return item.type === type;
  });

  const onchange = (e) => {
    const filter = clients.filter((item) => {
      const name = item.name.toUpperCase();
      return name.indexOf(e.target.value.toUpperCase()) !== -1;
    });
    setFilterlist(filter);
  };

  return (
    <Wrapper>
      <Text>Selecione o {type === "2" ? "Comprador" : "Fornecedor"}</Text>
      <Filter onChange={onchange}></Filter>
      {filterList
        ? filterList.map((item) => (
            <Item
              key={item.id}
              selected={state.client === item.id}
              onClick={() => {
                dispatch({ type: "SELECT_CLIENT", payload: { id: item.id } });
              }}
            >
              {item.name}
            </Item>
          ))
        : clients.map((item) => (
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

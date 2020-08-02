import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import ClientsList from "../../molecules/Clients/List";
import Adder from "../../molecules/Clients/Adder";
import Edit from "../../molecules/Clients/Edit";

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

function DashboardClients({ type }) {
  const { loading, data, refetch } = useQuery(GETCLIENTS);
  const [state, dispatch] = useState({
    update: false,
    client: null,
  });

  const provider = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    dispatch({
      update: false,
      client: null,
      add: false,
    });
  }, [type]);

  if (loading) {
    return <h1>loading</h1>;
  }

  const filter = data.getClients.filter((item) => {
    return item.type === (type === "Fornecedor" ? "1" : "2");
  });

  return (
    <>
      <List>
        <ClientsList
          title={type}
          clients={filter}
          refetch={refetch}
          dispatch={dispatch}
          state={state}
        ></ClientsList>
      </List>
      {state.add ? (
        <Options>
          {state.update ? (
            <Edit
              client={state.client}
              refetch={refetch}
              provider={provider}
            ></Edit>
          ) : (
            <Adder type={type} refetch={refetch} provider={provider}></Adder>
          )}
        </Options>
      ) : null}
    </>
  );
}

const Wrapper = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const List = styled(Wrapper)`
  flex: 2;
`;

const Options = styled(Wrapper)`
  flex: 1;
  border-left: 1px dashed rgb(80, 80, 80);
  @media (max-width: 465px) {
    position: absolute;
    background: lightgray;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

export default DashboardClients;

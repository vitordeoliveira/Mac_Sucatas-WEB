import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import ClientsList from "../../molecules/Clients/List";
import Adder from "../../molecules/Clients/Adder";

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
          loading={loading}
        ></ClientsList>
      </List>
      <Options>
        <Adder type={type} refetch={refetch}></Adder>
      </Options>
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
  border-right: 1px dashed rgb(80, 80, 80);
`;

const Options = styled(Wrapper)`
  flex: 1.3;
`;

export default DashboardClients;

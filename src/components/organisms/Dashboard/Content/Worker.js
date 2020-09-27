import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import WorkerList from "../../../molecules/Workers/List";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Adder from "../../../molecules/Workers/Adder";
import Edit from "../../../molecules/Workers/Edit";

const GETWORKERS = gql`
  {
    getWorkers {
      id
      name
      Company {
        name
      }
      phone
    }
  }
`;

function DashboardProduct() {
  const { data, loading, refetch } = useQuery(GETWORKERS);
  const [state, dispatch] = useState({
    update: false,
    add: false,
    worker: null,
    option: false,
  });

  const provider = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    if (provider.state.update) dispatch((state) => ({ ...state, add: false }));
  }, [provider.state.update]);

  useEffect(() => {
    if (provider.state.add) dispatch((state) => ({ ...state, update: false }));
  }, [provider.state.add]);

  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <>
      <List>
        <WorkerList
          data={data.getWorkers}
          refetch={refetch}
          provider={provider}
        ></WorkerList>
      </List>
      {state.option ? (
        <Options>
          {state.update && <Edit refetch={refetch} provider={provider}></Edit>}
          {state.add && <Adder refetch={refetch} provider={provider}></Adder>}
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
  flex: 1.3;
  border-left: 1px dashed rgb(80, 80, 80);

  @media (max-width: 465px) {
    position: absolute;
    background: lightgray;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

export default DashboardProduct;

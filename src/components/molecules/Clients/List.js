import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const DELETECLIENTS = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

function List({ title, clients, refetch, dispatch, state }) {
  const [ondelete] = useMutation(DELETECLIENTS);
  const [loading, setLoading] = useState(false);

  const onclick = async (id) => {
    try {
      setLoading(true);
      await ondelete({
        variables: {
          id,
        },
      });
      setLoading(false);
      refetch();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Title>
        {title}
        {state.add ? (
          <Close
            onClick={() => {
              dispatch((state) => ({ ...state, add: false }));
            }}
          >
            +
          </Close>
        ) : (
          <Add
            onClick={() => {
              dispatch((state) => ({ ...state, add: true }));
            }}
          >
            +
          </Add>
        )}
      </Title>

      <Wrapper>
        <Header>
          <ID>ID</ID>
          <Name>Nome</Name>
          <Email>Email</Email>
          <Phone>Telefone</Phone>
          <Option>Editar</Option>
          <Option>Excluir</Option>
        </Header>

        {clients.map((client) => (
          <Items key={client.id}>
            <ID>{client.id}</ID>
            <Name>{client.name}</Name>
            <Email>{client.email}</Email>
            <Phone>{client.phone}</Phone>
            <OptionItem
              edit
              onClick={() =>
                dispatch({ update: true, client: client, add: true })
              }
            >
              O
            </OptionItem>
            <OptionItem onClick={() => onclick(client.id)}>
              {loading ? "loading" : "X"}
            </OptionItem>
          </Items>
        ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 95%;
`;

const Title = styled.h1`
  color: rgb(50, 50, 50);
  display: flex;
  align-items: center;
`;

const Add = styled.span`
  font-size: 50px;
  color: rgb(90, 150, 90);
  cursor: pointer;
  margin-left: 8px;
`;

const Close = styled(Add)`
  color: rgb(150, 90, 90);
  transform: rotate(45deg);
`;

const Content = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

const Header = styled(Content)`
  font-weight: bold;
`;

const Items = styled(Content)`
  border-radius: 15px;
  transition: all 0.3s;

  :hover {
    border: 0;
    box-shadow: 0 0 3px rgb(50, 50, 50);
  }
`;

const Item = styled.li`
  list-style: none;
  text-align: center;
  margin: 8px 0;
  align-self: center;
`;

const ID = styled(Item)`
  flex: 1;
`;

const Name = styled(Item)`
  flex: 2;
  user-select: initial;
`;

const Email = styled(Item)`
  flex: 3;
`;

const Phone = styled(Item)`
  flex: 3;
`;

const Option = styled(Item)`
  flex: 1;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionItem = styled(Option)`
  cursor: pointer;
  align-self: normal;

  ${(props) => (props.edit ? null : "border-radius: 0 15px 15px 0")};
  transition: all 0.5s;
  :hover {
    font-weight: bold;
    color: #fff;
    ${(props) =>
      props.edit ? "background:rgb(30,155,30)" : "background:rgb(255,90,90)"};
  }
`;

export default List;

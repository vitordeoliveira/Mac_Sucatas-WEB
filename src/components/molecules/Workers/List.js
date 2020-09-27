import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const DELETEWORKERS = gql`
  mutation deleteWorker($id: ID!) {
    deleteWorker(id: $id)
  }
`;

function List({ data, refetch, provider }) {
  const [ondelete] = useMutation(DELETEWORKERS);
  const [items, setItems] = useState([]);
  const { state, dispatch } = provider;

  const onclick = async (id) => {
    try {
      await ondelete({
        variables: {
          id,
        },
      });
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const newarr = data;
    newarr.sort((a, b) => {
      const a_name = a.name.toUpperCase();
      const b_name = b.name.toUpperCase();
      if (a_name < b_name) return -1;
      if (a_name > b_name) return 1;
      return 0;
    });

    setItems(newarr);
  }, [data]);

  return (
    <>
      <Title>
        Funcionários
        {state.add ? (
          <Close
            onClick={() => {
              dispatch((state) => ({ ...state, add: false, option: false }));
            }}
          >
            +
          </Close>
        ) : (
          <Add
            onClick={() => {
              dispatch((state) => ({ ...state, add: true, option: true }));
            }}
          >
            +
          </Add>
        )}
      </Title>

      <Wrapper>
        <Header>
          <Item>ID</Item>
          <Item>Nome</Item>
          <Item>Empresa</Item>
          <Item>Telefone</Item>
          <Option>Editar</Option>
          <Option>Excluir</Option>
        </Header>

        {items.map((item) => (
          <Items key={item.id}>
            <Item>{item.id}</Item>
            <Item>{item.name}</Item>
            <Item>{item.Company && item.Company.name}</Item>
            <Item>{item.phone}</Item>
            <OptionItem
              edit
              onClick={() =>
                dispatch((state) => ({
                  ...state,
                  update: true,
                  worker: item,
                  option: true,
                }))
              }
            >
              O
            </OptionItem>
            <OptionItem onClick={() => onclick(item.id)}>X</OptionItem>
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
  width: 15%;
`;

const Option = styled(Item)`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
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

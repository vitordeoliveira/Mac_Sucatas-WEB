import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineReload } from "react-icons/ai";

function List({ products, dispatch, remove, refresh, provider }) {
  const { loading, data } = products;
  const [items, setItems] = useState([]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!loading && data && data.getProduct) {
      const newarr = data.getProduct;
      newarr.sort((a, b) => {
        const a_name = a.name.toUpperCase();
        const b_name = b.name.toUpperCase();
        if (a_name < b_name) return -1;
        if (a_name > b_name) return 1;
        return 0;
      });

      setItems(newarr);
    }
  }, [loading, data]);

  return (
    <>
      <Title>
        PRODUTOS{" "}
        <Refresh
          onClick={() => {
            refresh({ reload: true });
          }}
          size={20}
        ></Refresh>
        {provider.adder ? (
          <Close
            onClick={() => {
              provider.setAdder(false);
            }}
          >
            +
          </Close>
        ) : (
          <Add
            onClick={() => {
              provider.setAdder(true);
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
          <Stock>Estoque</Stock>
          <Stock>Balanço</Stock>
          <Option>Editar</Option>
          <Option>Excluir</Option>
        </Header>

        {loading ? (
          <Loading>loading...</Loading>
        ) : (
          items.map((item) => (
            <Items key={item.id}>
              <ID>{item.id}</ID>
              <Name>{item.name}</Name>
              <Stock>{item.stock}kg</Stock>
              <Stock>R${item.balanceStock}</Stock>
              <OptionItem
                onClick={() => {
                  provider.setAdder(true);
                  dispatch({ type: "onUpdate", id: item.id });
                }}
                edit
              >
                O
              </OptionItem>
              <OptionItem
                onClick={() => {
                  remove(item.id);
                }}
              >
                X
              </OptionItem>
            </Items>
          ))
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 90%;
`;

const Title = styled.h1`
  color: rgb(50, 50, 50);
  display: flex;
  align-items: center;
`;

const Refresh = styled(AiOutlineReload)`
  color: rgb(90, 150, 90);
  cursor: pointer;
  margin: 8px;
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
  padding: 0;
`;

const Loading = styled.h1`
  margin-top: 80px;
  text-align: center;
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
`;

const ID = styled(Item)`
  flex: 1;
  border-right: 1px solid;
`;

const Name = styled(Item)`
  flex: 2;
  border-right: 1px solid;
`;

const Stock = styled(Item)`
  flex: 3;
  border-right: 1px solid;
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

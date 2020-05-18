import React from "react";
import styled from "styled-components";
import { AiOutlineReload } from "react-icons/ai";

function ProductsList({ products, dispatch, remove, refresh }) {
  if (products.loading) {
    return (
      <Wrapper>
        <h1>LOADING...</h1>
      </Wrapper>
    );
  }

  return (
    <>
      <Title>
        PRODUTOS{" "}
        <Refresh
          onClick={() => {
            refresh();
          }}
          size={20}
        ></Refresh>
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

        {products.data.getProduct &&
          products.data.getProduct.map((item) => (
            <Items key={item.id}>
              <ID>{item.id}</ID>
              <Name>{item.name}</Name>
              <Stock>{item.stock}kg</Stock>
              <Stock>R${item.balanceStock}</Stock>
              <OptionItem
                onClick={() => {
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
          ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 90%;
`;

const Title = styled.h1`
  color: rgb(50, 50, 50);
`;

const Refresh = styled(AiOutlineReload)`
  color: green;
  cursor: pointer;
`;

const Content = styled.ul`
  display: flex;
  justify-content: space-between;
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
  user-select: none;
`;

const ID = styled(Item)`
  flex: 1;
`;

const Name = styled(Item)`
  flex: 2;
  user-select: initial;
`;

const Stock = styled(Item)`
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

  ${(props) => (props.edit ? null : "border-radius: 0 15px 15px 0")};
  transition: all 0.5s;
  :hover {
    font-weight: bold;
    color: #fff;
    ${(props) =>
      props.edit ? "background:rgb(30,155,30)" : "background:rgb(255,90,90)"};
  }
`;

export default ProductsList;

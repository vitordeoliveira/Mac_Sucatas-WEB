import React from "react";
import styled from "styled-components";

function ProductsList({ products, deleteProduct, refresh }) {
  const onDelete = async (id) => {
    try {
      await deleteProduct({
        variables: { id },
      });
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (products.loading) {
    return (
      <Wrapper>
        <h1>LOADING...</h1>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>
        <ID>ID</ID>
        <Name>Nome</Name>
        <Stock>Estoque</Stock>
        <Stock>Balanço</Stock>
        <Option>Editar</Option>
        <Option>Excluir</Option>
      </Title>

      {products.data.getProduct &&
        products.data.getProduct.map((item) => (
          <Items key={item.id}>
            <ID>{item.id}</ID>
            <Name>{item.name}</Name>
            <Stock>{item.stock}kg</Stock>
            <Stock>{item.balanceStock}kg</Stock>
            <OptionItem
              onClick={() => alert("Esta opção ainda não funciona")}
              edit
            >
              O
            </OptionItem>
            <OptionItem
              onClick={() => {
                onDelete(item.id);
              }}
            >
              X
            </OptionItem>
          </Items>
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
`;

const Content = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0;
`;

const Title = styled(Content)`
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

import React from "react";
import styled from "styled-components";
import useProducts from "../hooks/useProducts";
import ProductsList from "../components/molecules/ProductsList";
import ProductsForm from "../components/molecules/ProductsAddForm";

function Product() {
  const [products, refresh, add, update, remove] = useProducts();

  return (
    <>
      <List>
        <Title>PRODUTOS</Title>
        <ProductsList
          products={products}
          remove={remove}
          update={update.onUpdate}
          refresh={refresh}
        ></ProductsList>
      </List>
      <Options>
        <Title>EDITAR</Title>
        <ProductsForm add={add}></ProductsForm>
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

const Title = styled.h1`
  color: rgb(50, 50, 50);
`;

export default Product;

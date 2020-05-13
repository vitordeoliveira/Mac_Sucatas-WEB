import React from "react";
import styled from "styled-components";
import useProducts from "../../hooks/useProducts";
import ProductsList from "../molecules/ProductsList";
import ProductsForm from "../molecules/ProductsForm";

function DashboardProduct() {
  const [products, refresh, addProducts, deleteProduct] = useProducts();

  return (
    <>
      <Products>
        <Title>PRODUTOS</Title>
        <ProductsList
          products={products}
          deleteProduct={deleteProduct}
          refresh={refresh}
        ></ProductsList>
      </Products>
      <Adder>
        <Title>ADICIONAR</Title>
        <ProductsForm Add={addProducts} refresh={refresh}></ProductsForm>
      </Adder>
    </>
  );
}

const Wrapper = styled.div`
  flex: 2;
  padding: 10px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Products = styled(Wrapper)`
  border-right: 1px dashed rgb(80, 80, 80);
`;

const Adder = styled(Wrapper)`
  flex: 1.3;
`;

const Title = styled.h1`
  color: rgb(50, 50, 50);
`;

export default DashboardProduct;

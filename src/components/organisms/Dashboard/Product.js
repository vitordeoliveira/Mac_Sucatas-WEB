import React from "react";
import styled from "styled-components";
import useProducts from "../../../hooks/useProducts";
import useUpdateProduct from "../../../hooks/useUpdateProduct";
import ProductsList from "../../molecules/ProductsList";

import Adder from "../../molecules/Products/AddForm";
import Update from "../../molecules/Products/Update";

function DashboardProduct() {
  const [products, refresh, add, remove] = useProducts();
  const [mode, onUpdate, offUpdate, state, update] = useUpdateProduct();

  return (
    <>
      <List>
        <ProductsList
          products={products}
          remove={remove}
          onUpdate={onUpdate}
          refresh={refresh}
        ></ProductsList>
      </List>
      <Options>
        {!mode ? (
          <Adder add={add}></Adder>
        ) : (
          <Update
            state={state}
            offUpdate={offUpdate}
            update={update}
            refresh={refresh}
          ></Update>
        )}
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

export default DashboardProduct;

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import useProducts from "../../../../hooks/useProducts";
import useUpdateProduct from "../../../../hooks/useUpdateProduct";
import ProductsList from "../../../molecules/Products/List";

import Adder from "../../../molecules/Products/Adder";
import Update from "../../../molecules/Products/Update";

function DashboardProduct() {
  const [products, refresh, add, remove] = useProducts();
  const [dispatch, state, update] = useUpdateProduct();
  const [adder, setAdder] = useState(false);
  const provider = useMemo(() => ({ adder, setAdder }), [adder, setAdder]);

  return (
    <>
      <List>
        <ProductsList
          products={products}
          remove={remove}
          dispatch={dispatch}
          refresh={refresh}
          provider={provider}
        ></ProductsList>
      </List>
      {provider.adder ? (
        <Options>
          {!state.showUpdate ? (
            <Adder products={products} add={add} provider={provider}></Adder>
          ) : (
            <Update
              state={state}
              dispatch={dispatch}
              update={update}
              refresh={refresh}
              provider={provider}
            ></Update>
          )}
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

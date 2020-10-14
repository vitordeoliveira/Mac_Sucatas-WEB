import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import List from "../../atoms/Operation/List";
import Option from "../../atoms/Operation/Options";
// import Filter from "../../atoms/Operation/Filter";

const GETPRODUCTS = gql`
  {
    getProduct {
      id
      name
      stock
    }
  }
`;

export default function Add({ provider, onsubmit }) {
  const { state, dispatch } = provider;
  const { loading, data, refetch } = useQuery(GETPRODUCTS);
  const [products, setProducts] = useState(state.products);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!loading) {
      const arr = data.getProduct;
      const newarr = arr.map((item) => {
        return {
          id: item.id,
          name: item.name,
          stock: item.stock,
          value: "",
          amount: "",
          added: false,
        };
      });

      newarr.sort((a, b) => {
        const a_name = a.name.toUpperCase();
        const b_name = b.name.toUpperCase();
        if (a_name < b_name) return -1;
        if (a_name > b_name) return 1;
        return 0;
      });

      dispatch({
        type: "LOAD_PRODUCTS",
        payload: {
          products: newarr,
        },
      });

      setProducts(newarr);
    }
  }, [data, loading, dispatch]);

  const onadd = (index, value, amount) => {
    if (value !== "" && amount !== "") {
      const actual = state.products;
      const obj = {
        ...actual[index],
        value,
        amount,
        added: !actual[index].added,
      };
      actual[index] = obj;

      dispatch({
        type: "LOAD_PRODUCTS",
        payload: {
          products: actual,
        },
      });

      setProducts(actual);
    }
  };

  // const onchange = (e) => {
  //   const filter = state.products.filter((item) => {
  //     const name = item.name.toUpperCase();
  //     return name.indexOf(e.target.value.toUpperCase()) !== -1;
  //   });
  //   setProducts(filter);
  // };

  return (
    <Wrapper>
      <Text>Adicionar produtos a nota</Text>
      <Button onClick={onsubmit}>Finalizar</Button>
      <View>
        <Option
          onclick={(e) =>
            dispatch({
              type: "ADDITIONAL",
              payload: { value: e, lock: !state.additional.lock },
            })
          }
          text="Adicional"
          lock={state.additional.lock}
        ></Option>
        {/* <Filter onChange={onchange}></Filter> */}
        <Option
          onclick={(e) =>
            dispatch({
              type: "DISCOUNT",
              payload: { value: e, lock: !state.discount.lock },
            })
          }
          text="Desconto"
          lock={state.discount.lock}
        ></Option>
      </View>

      {products.map((item, index) => (
        <List key={index} item={item} index={index} onadd={onadd}></List>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const View = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Text = styled.h1``;

const Button = styled.div`
  padding: 10px;
  background: rgb(90, 200, 90);
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;

  :hover {
    box-shadow: 0 0 1px black;
  }
`;

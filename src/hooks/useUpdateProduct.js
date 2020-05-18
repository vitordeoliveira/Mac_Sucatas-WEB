import { useState, useReducer, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GETPRODUCT = gql`
  query getProduct($id: ID) {
    getProduct(filterById: $id) {
      id
      name
      stock
      balanceStock
    }
  }
`;

const UPDATEPRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String
    $stock: Int
    $balanceStock: Float
  ) {
    updateProduct(
      id: $id
      name: $name
      stock: $stock
      balanceStock: $balanceStock
    )
  }
`;

function reducer(state, item) {
  switch (item.loading) {
    case true:
      return state;
    case false:
      if (item.data.getProduct.length !== 0) {
        return item.data.getProduct[0];
      }
      return state;

    default:
      return state;
  }
}

function useUpdateProduct() {
  const [state, dispatch] = useReducer(reducer, {
    id: 0,
    name: "",
    stock: "",
    balanceStock: "",
  });

  const [ID, setID] = useState(0);
  const [updateMode, setUpdateMode] = useState(false);

  const { loading, data } = useQuery(GETPRODUCT, {
    variables: { id: ID },
  });

  const [update] = useMutation(UPDATEPRODUCT);

  useEffect(() => {
    dispatch({ loading, data });
  }, [loading, data]);

  function onUpdate(id) {
    setUpdateMode(true);
    setID(id);
  }

  function offUpdate() {
    setUpdateMode(false);
  }

  return [updateMode, onUpdate, offUpdate, state, update];
}

export default useUpdateProduct;

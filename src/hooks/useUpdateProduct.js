import { useReducer, useEffect } from "react";
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

function reducer(state, payload) {
  switch (payload.type) {
    case "load":
      if (payload.data.getProduct.length !== 0) {
        return {
          ...state,
          id: payload.data.getProduct[0].id,
          name: payload.data.getProduct[0].name,
          stock: payload.data.getProduct[0].stock,
          balanceStock: payload.data.getProduct[0].balanceStock,
        };
      }
      return state;

    case "update":
      const update = async () => {
        await payload.update({
          variables: {
            id: payload.id,
            name: payload.name,
            stock: Number(payload.stock),
            balanceStock: Number(payload.balanceStock),
          },
        });
      };
      update();

      return { ...state };

    case "onUpdate":
      return {
        ...state,
        id: payload.id,
        showUpdate: true,
      };
    case "offUpdate":
      return {
        ...state,
        showUpdate: false,
      };

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
    showUpdate: false,
  });
  const [update] = useMutation(UPDATEPRODUCT);

  const { loading, data } = useQuery(GETPRODUCT, {
    variables: { id: state.id },
  });

  useEffect(() => {
    if (!loading) {
      dispatch({ type: "load", data });
    }
  }, [loading, data]);

  return [dispatch, state, update];
}

export default useUpdateProduct;

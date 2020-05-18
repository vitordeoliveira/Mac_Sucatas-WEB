import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ADDPRODUCT = gql`
  mutation AddProduct($name: String!, $stock: Int, $balanceStock: Float) {
    addProduct(name: $name, stock: $stock, balanceStock: $balanceStock) {
      id
      name
      stock
    }
  }
`;

const GETPRODUCTS = gql`
  {
    getProduct {
      id
      name
      stock
      balanceStock
    }
  }
`;

const DELETEPRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
      error
    }
  }
`;

function useProducts() {
  const [add] = useMutation(ADDPRODUCT);
  const [remove] = useMutation(DELETEPRODUCT);
  const { loading, data, refetch } = useQuery(GETPRODUCTS);

  const onAdd = async (name, stock, balanceStock) => {
    try {
      await add({
        variables: {
          name,
          stock: Number(stock),
          balanceStock: Number(balanceStock.replace(",", ".")),
        },
      });
      refetch();
    } catch ({ graphQLErrors }) {
      alert(graphQLErrors[0].message);
    }
  };

  const onRemove = async (id) => {
    try {
      const { data } = await remove({
        variables: { id },
      });
      const { success, error } = data.deleteProduct;

      if (!success) {
        alert(error);
      }
      refetch();
    } catch ({ graphQLErrors }) {
      alert(graphQLErrors[0].message);
    }
  };

  return [{ loading, data }, refetch, onAdd, onRemove];
}

export default useProducts;

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

const GETPRODUCT = gql`
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
    deleteProduct(id: $id)
  }
`;

function useProducts() {
  const [addProduct] = useMutation(ADDPRODUCT);
  const [deleteProduct] = useMutation(DELETEPRODUCT);
  const { loading, data, refetch } = useQuery(GETPRODUCT);

  return [{ loading, data }, refetch, addProduct, deleteProduct];
}

export default useProducts;

import { useContext, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Context from ".";

const AUTH = gql`
  {
    auth {
      id
      name
      role
    }
  }
`;

export default function useLoadUser() {
  const { data, loading } = useQuery(AUTH);
  const { setAuth } = useContext(Context);

  useEffect(() => {
    if (!loading && data && data.auth) {
      setAuth((old) => ({
        ...old,
        isAuthenticated: true,
        loading,
        user: data.auth,
      }));
    } else {
      setAuth((old) => ({
        ...old,
        loading,
      }));
    }
  }, [data, loading, setAuth]);
}

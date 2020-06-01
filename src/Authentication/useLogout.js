import Context from ".";
import { useContext } from "react";

export default function useLogout() {
  const { setAuth } = useContext(Context);

  const dispatch = () => {
    localStorage.removeItem("token");
    setAuth({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  return { dispatch };
}

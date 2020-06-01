import { useMemo, useState } from "react";

export default function useAuth() {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
  });

  return useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
}

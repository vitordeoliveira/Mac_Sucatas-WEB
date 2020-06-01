import { useState, useEffect } from "react";

function useError() {
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  return [error, setError];
}

export default useError;

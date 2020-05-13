import React, { useState, useContext } from "react";
import styled from "styled-components";
// import useLogin from "../../Authentication/useLogin";
import Button from "../atoms/Button";
import LoginInput from "../atoms/LoginInput";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import Auth from "../../Authentication";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN);
  const history = useHistory();
  const { setAuth } = useContext(Auth);

  const onclick = async () => {
    try {
      const { data } = await login({
        variables: { username, password },
      });
      if (data.login.token) {
        setAuth({
          token: data.login.token,
          isAuthenticated: true,
          loading: false,
          user: data.login.user,
        });
        localStorage.setItem("token", data.login.token);
        history.push("/dashboard");
      } else {
        setError("Usuario ou senha incorretos");
      }
    } catch (error) {
      console.log(error);
      setError("Erro no servidor");
    }
  };

  return (
    <>
      <Form>
        {error ? <Error>{error}</Error> : null}
        <LoginInput
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></LoginInput>
        <LoginInput
          password
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></LoginInput>
        <Button onClick={onclick}>Login</Button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 95%;
  min-width: 300px;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 0 2px;
  border-radius: 15px;
  background: #f9f9f9;
  position: relative;
`;

const Error = styled.p`
  color: red;
  height: auto;
  text-align: center;
  position: absolute;
  top: 5px;
`;

export default LoginForm;

import React from "react";
import styled from "styled-components";

function LoginButton({ ...props }) {
  return (
    <Button {...props}>
      <Text>Login</Text>
    </Button>
  );
}

const Button = styled.div`
  display: flex;
  height: 40px;
  width: 50%;
  border-radius: 50px;
  border: 0;
  background: #2c6126;
  cursor: pointer;
  align-items: center;
  text-align: center;
  transition: all 0.7s;

  :focus {
    outline-width: 0;
    border: 1px solid green;
  }

  :hover {
    box-shadow: 3px 3px 5px;
  }
`;

const Text = styled.h1`
  height: auto;
  color: #fff;
  text-transform: uppercase;
  font-size: 25px;
`;

export default LoginButton;

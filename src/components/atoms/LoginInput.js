import React from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";

function LoginInput({ password, ...props }) {
  return (
    <Wrapper>
      <Icon>
        {!password ? <FaUserCircle></FaUserCircle> : <AiFillLock></AiFillLock>}
      </Icon>
      <Input {...props}></Input>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 70%;
  height: 40px;
  display: flex;
  position: relative;
  justify-content: center;
`;

const Icon = styled.div`
  height: 40px;
  display: flex;
  position: absolute;
  width: auto;
  left: 20px;
  align-items: center;
`;

const Input = styled.input`
  border-radius: 50px;
  border: 0;
  padding: 0 50px;
  border: 2px solid #2c6126;
  text-align: center;
  font-size: 15px;

  :focus {
    outline-width: 0;
  }

  ::placeholder {
    letter-spacing: 2px;
  }
`;

export default LoginInput;

import React from "react";
import styled from "styled-components";

function Button({ children, ...props }) {
  return (
    <Wrapper {...props}>
      <Text>{children}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 40px;
  width: 50%;
  border-radius: 50px;
  border: 0;
  background: rgb(30, 100, 30);
  cursor: pointer;
  align-items: center;
  transition: all 0.3s;
  justify-content: center;

  :focus {
    outline-width: 0;
    border: 1px solid green;
  }

  :hover {
    box-shadow: 1px 1px 5px;
  }
`;

const Text = styled.h1`
  height: auto;
  color: #fff;
  text-transform: uppercase;
  font-size: 25px;
`;

export default Button;

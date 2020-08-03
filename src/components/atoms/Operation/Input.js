import React from "react";
import styled from "styled-components";

function OperationInput({ value, prefix, sufix, ...props }) {
  return (
    <Wrapper>
      <Text>{prefix}</Text>
      <Input {...props} value={value}></Input>
      <Text>{sufix}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 30px;
  border-radius: 15px;
  max-width: 90px;
  border: 1px solid green;
  text-align: center;
  background: none;
  margin: 0 5px;
`;

const Text = styled.p``;

export default OperationInput;

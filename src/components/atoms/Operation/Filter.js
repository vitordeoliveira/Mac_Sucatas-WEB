import React from "react";
import styled from "styled-components";

function Filter({ text, onclick=()=>{},...props }) {
  return (
    <Wrapper>
      <Input {...props} placeholder="Filtrar"></Input>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  height: 30px;
  border-radius: 15px;
  border: 1px solid green;
  text-align: center;
  background: none;
  margin: 0 5px;
  max-width:200px;

  :focus {
    outline: none;
  };

  :placeholder{
      text-align:center;
  };
`;


export default Filter;

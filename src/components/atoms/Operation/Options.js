import React, {useState} from "react";
import styled from "styled-components";

function Options({ text, onclick=()=>{}, lock, ...props }) {
  const [value, setValue] = useState("")
  return (
    <Wrapper>
      <Input {...props} value={value} onChange={e=>setValue(e.target.value)}></Input>
      <Button lock={lock} onClick={()=>onclick(value)}>{text}</Button>
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
  }
`;

const Button = styled.div`
  width:95px;
  padding: 10px;
  background: ${props=>props.lock ? "rgb(200,90,90)" : "rgb(90, 200, 90)"};
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    box-shadow: 0 0 1px black;
  }
`;

export default Options;

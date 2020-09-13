import React from "react";
import styled from "styled-components";

function DashboardContext({ text, value }) {
  return (
    <Wrapper>
      <Title>{text}</Title>
      <Value value={value}>R${value.toFixed(2)}</Value>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  border: 1px solid;
  height: 200px;
  width: 200px;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 15px;
  transition: all 0.3s;
  cursor: pointer;
  padding: 0 10px;
  :hover {
    border: 0;
    box-shadow: 0 0 3px rgb(50, 50, 50);
  }

  @media (max-width: 770px) {
    height: 120px;
    width: 120px;
  }

  @media (max-width: 465px) {
    width: auto;
    margin: 5px;
  }
`;

const Title = styled.h3`
  text-align: center;
  flex: 1;
  @media (max-width: 770px) {
    font-size: 15px;
  }
`;

const Value = styled.p`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${(props) => (props.value >= 0 ? "green" : "red")};

  @media (max-width: 770px) {
    font-size: 15px;
  }
`;

export default DashboardContext;

import React from "react";
import styled from "styled-components";

function DashboardMainItem({ operation }) {
  return (
    <Wrapper>
      <Value>{operation.Users.name}</Value>
      <Value>{operation.Products.name}</Value>
      <Value>R${operation.value}/Kg</Value>
      <Value>{operation.amount}Kg</Value>
      <Value>{operation.Clients.name}</Value>
      <Value>
        {operation.type === "1" ? <Buy>Compra</Buy> : <Sell>Venda</Sell>}
      </Value>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  border: 1px solid gray;
  min-height: 40px;
  margin: 5px 0;
  border-radius: 15px;
  transition: all 0.3s;
  justify-content: space-between;
  display: flex;
  align-items: center;

  :hover {
    border: 0;
    box-shadow: 0 0 3px rgb(50, 50, 50);
  }
`;

const Value = styled.p`
  width: 130px;
  text-align: center;

  @media (max-width: 770px) {
    width: auto;
    font-size: 13px;
  }

  @media (max-width: 465px) {
    font-size: 10px;
  }
`;

const Buy = styled.span`
  color: red;
`;

const Sell = styled.span`
  color: green;
`;

export default DashboardMainItem;

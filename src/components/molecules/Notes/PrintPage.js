import React from "react";
import styled from "styled-components";

export default class ComponentToPrint extends React.Component {
  render() {
    const {
      Companies,
      Operations,
      Clients,
      discount,
      additional,
      type,
      total,
    } = this.props.note;

    console.log(Operations);
    return (
      <Wrapper>
        <Value>
          Operação: {type === "1" ? <Buy>Compra</Buy> : <Sell>Venda</Sell>}
        </Value>
        <Value>Empresa: {Companies.name}</Value>
        <Item>
          <Paragraph>Produto</Paragraph>
          <Paragraph>Quantidade</Paragraph>
          <Paragraph>Valor</Paragraph>
          <Paragraph>Total</Paragraph>
        </Item>
        {Operations.map((item) => (
          <Item>
            <Paragraph>{item.Products.name}</Paragraph>
            <Paragraph>{item.amount} kg</Paragraph>
            <Paragraph>R$ {item.value}/kg</Paragraph>
            <Paragraph>R$ {item.amount * item.value}</Paragraph>
          </Item>
        ))}
        <Value>Desconto: R$ {discount}</Value>
        <Value>Adicional: R$ {additional}</Value>
        <Value>Cliente: {Clients.name}</Value>
        <Value>Total: R$ {total}</Value>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 30px auto;
  padding: 30px;
  width: 100%;
  height: 100%;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  aling-items: center;
`;

const Value = styled.p`
  text-align: center;
`;

const Paragraph = styled.p`
  text-align: center;
  width: 25%;
`;

const Buy = styled.span`
  color: red;
`;

const Sell = styled.span`
  color: green;
`;

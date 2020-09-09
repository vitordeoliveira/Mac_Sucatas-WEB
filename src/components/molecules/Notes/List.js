import React, { useRef } from "react";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";
import PrintPage from "./PrintPage";

function List({ note }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${note.Companies.name}-${note.Users.name}-${note.id}`,
  });

  return (
    <Wrapper>
      <Value>{note.Companies.name}</Value>
      <Value>{note.Users.name}</Value>
      <Value>R${note.discount}</Value>
      <Value>R${note.additional}</Value>
      <Value>{note.Clients.name}</Value>
      <Value>
        {note.type === "1" ? <Buy>Compra</Buy> : <Sell>Venda</Sell>}
      </Value>
      <Value>R${note.total}</Value>
      <Option onClick={handlePrint}>O</Option>

      <Print>
        <PrintPage ref={componentRef} note={note} />
      </Print>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  min-height: 40px;
  margin: 5px 0;
  border-radius: 15px;
  transition: all 0.3s;

  :hover {
    border: 0;
    box-shadow: 0 0 3px rgb(50, 50, 50);
  }

  @media (max-width: 770px) {
    width: 95%;
  }
`;

const Value = styled.p`
  width: 14%;
  text-align: center;

  @media (max-width: 770px) {
    font-size: 13px;
  }

  @media (max-width: 465px) {
    font-size: 10px;
  }
`;

const Option = styled(Value)`
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;

  :hover {
    background: green;
    color: #fff;
    font-weight: bold;
  }
`;

const Buy = styled.span`
  color: red;
`;

const Sell = styled.span`
  color: green;
`;

const Print = styled.div`
  display: none;
`;

export default List;

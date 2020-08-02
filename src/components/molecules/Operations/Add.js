import React, { useState } from "react";
import styled from "styled-components";

export default function Add({ provider }) {
  const { dispatch } = provider;
  const [data, setData] = useState({
    value: "",
    amount: "",
  });
  const { value, amount } = data;

  const onchange = (e) => {
    e.persist();
    const last = e.target.value.slice(-1);
    const checkNumber = Number(last);
    if (!isNaN(checkNumber) || last === "." || last === ",") {
      setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }
  };

  const onsubmit = () => {
    if (value !== "" && amount !== "") {
      dispatch({
        type: "CHANGE_VALUES",
        payload: {
          value: value.replace(",", "."),
          amount: amount.replace(",", "."),
        },
      });
    }
  };

  return (
    <Wrapper>
      <Text>Defina valor e quantidade</Text>
      <Form>
        <Label htmlFor="Amount">Quantidade(Kg)</Label>
        <Input id="Amount" name="amount" value={amount} onChange={onchange} />
        <Label htmlFor="Value">Valor/kg</Label>
        <Input id="Value" name="value" value={value} onChange={onchange} />

        <Button onClick={onsubmit}>Salvar valor</Button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.h3`
  display: flex;
  justify-content: center;
  margin-bottom: 70px;
  text-align: center;
`;

const Form = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-weight: bold;
  margin: 15px 0;
  font-size: 20px;
`;
const Input = styled.input`
  width: 90%;
  border-radius: 50px;
  border: 0;
  height: 35px;
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

const Button = styled.div`
  margin-top: 100px;
  padding: 10px;
  background: rgb(90, 200, 90);
  border-radius: 10px;
  cursor: pointer;

  :hover {
    box-shadow: 0 0 1px black;
  }
`;

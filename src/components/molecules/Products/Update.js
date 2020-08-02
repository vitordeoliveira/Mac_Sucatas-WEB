import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../../atoms/Button";

function Update({ state, dispatch, update, refresh, provider }) {
  const [formdata, setFormdata] = useState(state);
  const [loading, setLoading] = useState(false);

  const { id, name, stock, balanceStock } = formdata;

  useEffect(() => {
    setFormdata(state);
  }, [state]);

  const onchange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const onclick = async () => {
    try {
      setLoading(true);
      await update({
        variables: {
          id,
          name,
          stock: Number(stock),
          balanceStock: Number(balanceStock),
        },
      });

      refresh({ reload: true });
      setLoading(false);
      dispatch({ type: "offUpdate" });
      provider.setAdder(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Title>
        EDITAR{" "}
        {provider.adder ? (
          <Close
            onClick={() => {
              provider.setAdder(false);
            }}
          >
            +
          </Close>
        ) : null}
      </Title>
      <Wrapper>
        <Input
          value={name}
          name="name"
          onChange={(e) => onchange(e)}
          placeholder="Nome"
        ></Input>
        <Input
          value={stock}
          name="stock"
          onChange={(e) => onchange(e)}
          placeholder="Estoque"
        ></Input>
        <Input
          value={balanceStock}
          name="balanceStock"
          onChange={(e) => onchange(e)}
          placeholder={`Balan\u00e7o`}
        ></Input>
        <Button onClick={onclick}>{!loading ? "Enviar" : "loading"}</Button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 60%;
  max-height: 355px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 70px 0;
`;

const Title = styled.h1`
  color: rgb(50, 50, 50);
  display: flex;
  align-items: center;
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

const Close = styled.span`
  font-size: 50px;
  cursor: pointer;
  margin-left: 8px;
  color: rgb(150, 90, 90);
  transform: rotate(45deg);
`;

export default Update;

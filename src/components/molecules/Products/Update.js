import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../../atoms/Button";

function Update({ state, dispatch, update, refresh }) {
  const [formdata, setFormdata] = useState(state);

  const { id, name, stock, balanceStock } = formdata;

  useEffect(() => {
    setFormdata(state);
    refresh();
  }, [state, refresh]);
  const onchange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const onclick = async () => {
    try {
      await update({
        variables: {
          id,
          name,
          stock: Number(stock),
          balanceStock: Number(balanceStock),
        },
      });

      refresh();

      dispatch({ type: "offUpdate" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Title>EDITAR</Title>
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
        <Button onClick={onclick}>Enviar</Button>
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
`;

const Input = styled.input`
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

export default Update;

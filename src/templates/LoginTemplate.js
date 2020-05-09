import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(45, 60, 15, 0.8);
`;

const Container = styled.div`
  background: rgb(200, 200, 200);
  width: 50%;
  min-width: 300px;
  height: 80%;
  border-radius: 15px;
  box-shadow: 2px 2px 15px black;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  flex: 2;
  display: flex;
  height: 50%;
  text-align: center;
  align-items: center;
`;

const Form = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = ({ title, form, ...props }) => {
  return (
    <Wrapper {...props}>
      <Container>
        <Title>{title}</Title>
        <Form>{form}</Form>
      </Container>
    </Wrapper>
  );
};

export default Login;

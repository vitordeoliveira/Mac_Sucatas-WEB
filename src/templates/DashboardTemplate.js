import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Navs = styled.div`
  flex: 1;
  border: 1px solid;
`;

const User = styled.div`
  display: flex;
  height: 100px;
  border-bottom: 1px solid;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  flex: 4;
  border: 1px solid;
  display: flex;
`;

const Login = ({ user, navs, content, ...props }) => {
  return (
    <Wrapper {...props}>
      <Navs>
        <User>{user}</User>
        {navs}
      </Navs>
      <Content>{content}</Content>
    </Wrapper>
  );
};

export default Login;

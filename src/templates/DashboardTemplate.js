import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Navs = styled.div`
  flex: 1.4;
  background: rgba(50, 50, 50);

  // ::-webkit-scrollbar {
  //   width: 5px;
  // }

  // ::-webkit-scrollbar-track {
  //   background: #f1f1f1;
  // }

  // ::-webkit-scrollbar-thumb {
  //   background: #888;
  // }

  // ::-webkit-scrollbar-thumb:hover {
  //   background: #555;
  // }
`;

const User = styled.div`
  display: flex;
  height: 100px;
  border-bottom: 1px solid #fff;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  flex: 5;
  display: flex;
  background: rgba(200, 200, 200);
`;

const Login = ({ user, navs, children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Navs>
        <User>{user}</User>
        {navs}
      </Navs>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Login;

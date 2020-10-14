import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Navs = styled.div`
  flex: 1;
  background: rgba(50, 50, 50);

  @media screen and (max-width: 950px) {
    position: fixed;
    right: 0;
    z-index: 998;
    width: 100%;
    display: none;
  }

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
  position: relative;
`;

const Burguer = styled.div`
  display: none;
  background: gray;
  border-radius: 50px;
  height: 15px;
  width: 15px;
  position: fixed;
  right: 10px;
  top: 15px;
  cursor: pointer;
  z-index: 999;

  @media screen and (max-width: 950px) {
    display: block;
  }
`;

const Template = ({ user, navs, children, ...props }) => {
  const wrapper = useRef(null);
  const nav = useRef(null);
  const burger = useRef(null);
  const history = useHistory();

  useEffect(() => {
    history.listen(() => {
      if (nav && nav.current) {
        if (wrapper && wrapper.current && wrapper.current.clientWidth <= 950) {
          nav.current.style.display = "none";
        }
      }
    });
  }, [nav, wrapper, history]);

  const show = () => {
    if (
      nav.current.style.display === "" ||
      nav.current.style.display === "none"
    ) {
      burger.current.style.background = "white";
      nav.current.style.display = "block";
    } else if (nav.current.style.display === "block") {
      burger.current.style.background = "gray";
      nav.current.style.display = "none";
    }
  };

  return (
    <Wrapper ref={wrapper} {...props}>
      <Burguer ref={burger} onClick={show}></Burguer>
      <Navs ref={nav}>
        <User>{user}</User>
        {navs}
      </Navs>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Template;

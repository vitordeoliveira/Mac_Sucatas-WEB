import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useLogout from "../../Authentication/useLogout";

function DashboardNavs({ icon, children, to, logout, ...props }) {
  const { dispatch } = useLogout();
  const history = useHistory();

  return (
    <Wrapper
      onClick={() => (!logout ? history.push(`/dashboard/${to}`) : dispatch())}
      {...props}
    >
      <Icon>{icon}</Icon>
      <Item>{children}</Item>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  cursor: pointer;
  padding: 5px 0px 5px 25px;
  display: flex;
  align-items: end;
  height: 40px;
  transition: all 0.2s;
  margin: 10px 10px;

  :hover {
    box-shadow: 0 0 5px #fff;
    font-weight: bold;
  }
`;

const Icon = styled.div`
  color: white;
  margin-right: 8px;
  font-size: 17px;
`;

const Item = styled.li`  
  margin: 3px 0;
  color: white;
  height: auto;
  user-select: none;
  font-size: 15px;
}
`;

export default DashboardNavs;

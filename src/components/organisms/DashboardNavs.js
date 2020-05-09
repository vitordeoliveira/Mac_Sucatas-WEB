import React from "react";
import styled from "styled-components";

import Item from "../atoms/DashboardItem";

function DashboardNavs() {
  return (
    <List>
      <Item>Dashboard</Item>
      <Item>2</Item>
      <Item>LogOut</Item>
    </List>
  );
}

const List = styled.ul`
  height: auto;
  list-style: none;
  padding: 0;
`;

export default DashboardNavs;

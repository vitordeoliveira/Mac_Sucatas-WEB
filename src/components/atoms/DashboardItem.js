import React from "react";
import styled from "styled-components";

function DashboardNavs({ children, ...props }) {
  return <Item {...props}>{children}</Item>;
}

const Item = styled.li`
  cursor: pointer;
  padding: 5px 25px;
  background: blue;
  margin: 3px 0;
`;

export default DashboardNavs;

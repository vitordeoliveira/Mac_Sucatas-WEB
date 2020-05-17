import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const List = styled(Wrapper)`
  flex: 2;
  border-right: 1px dashed rgb(80, 80, 80);
`;

const Functions = styled(Wrapper)`
  flex: 1.3;
`;

function DashboardProducts({ list, functions }) {
  return (
    <>
      <List>{list}</List>
      <Functions>{functions}</Functions>
    </>
  );
}

export default DashboardProducts;

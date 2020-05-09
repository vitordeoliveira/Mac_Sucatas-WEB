import React, { useContext } from "react";
import styled from "styled-components";
import User from "../../Authentication";

function DashboardUser() {
  const { auth } = useContext(User);

  return (
    <>
      <ID>ID:{auth.user.id}</ID>
      <Name>{auth.user.name}</Name>
    </>
  );
}

const Paragraph = styled.p`
  font-size: 15px;
  height: auto;
`;

const ID = styled(Paragraph)`
  font-size: 15px;
  position: absolute;
  top: 10px;
  left: 10px;
  margin: 0;
`;
const Name = styled(Paragraph)`
  font-weight: bold;
  text-align: center;
`;

export default DashboardUser;

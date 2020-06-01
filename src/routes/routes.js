import React from "react";
import useLoadUser from "../Authentication/useLoadUser";
import Public from "./Public";
import Private from "./Private";

function Routes() {
  useLoadUser();

  return (
    <>
      <Public></Public>
      <Private></Private>
    </>
  );
}

export default Routes;

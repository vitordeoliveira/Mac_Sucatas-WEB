import React from "react";
import { Route } from "react-router-dom";

import Login from "../pages/Login";

const Public = () => {
  return <Route path="/" exact component={Login}></Route>;
};

export default Public;

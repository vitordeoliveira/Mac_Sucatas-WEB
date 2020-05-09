import React from "react";
import { PrivateRoute } from "../Authentication/PrivateRoute";

import Dashboard from "../pages/Dashboard";

export default function Private() {
  return (
    <PrivateRoute path="/dashboard" exact component={Dashboard}></PrivateRoute>
  );
}

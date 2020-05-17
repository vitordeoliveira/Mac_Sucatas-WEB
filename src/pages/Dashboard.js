import React from "react";
import { useParams } from "react-router-dom";
import DashboardTemplate from "../templates/DashboardTemplate";

import User from "../components/molecules/DashboardUser";

import Navs from "../components/organisms/Dashboard/Navs";
import Main from "../components/organisms/Dashboard/Main";
import Product from "../components/organisms/Dashboard/Product";

function Dashboard() {
  const { id } = useParams();
  return (
    <DashboardTemplate user={<User></User>} navs={<Navs></Navs>}>
      {!id ? <Main></Main> : null}
      {id === "product" ? <Product></Product> : null}
    </DashboardTemplate>
  );
}

export default Dashboard;

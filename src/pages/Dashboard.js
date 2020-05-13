import React from "react";
import { useParams } from "react-router-dom";
import DashboardTemplate from "../templates/DashboardTemplate";

import User from "../components/molecules/DashboardUser";
import Navs from "../components/organisms/DashboardNavs";

import Main from "../components/organisms/DashboardMain";
import Product from "../components/organisms/DashboardProduct";

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

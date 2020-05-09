import React from "react";

import DashboardTemplate from "../templates/DashboardTemplate";

import User from "../components/molecules/DashboardUser";
import Navs from "../components/organisms/DashboardNavs";

function Dashboard() {
  return (
    <DashboardTemplate
      user={<User></User>}
      navs={<Navs></Navs>}
    ></DashboardTemplate>
  );
}

export default Dashboard;

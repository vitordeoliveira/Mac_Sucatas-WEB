import React from "react";
import DashboardTemplate from "../templates/DashboardTemplate";

import User from "../components/molecules/DashboardUser";

import Navs from "../components/organisms/Dashboard/Navs";
import DashboardCorpus from "../components/organisms/Dashboard";

function Dashboard() {
  return (
    <DashboardTemplate user={<User></User>} navs={<Navs></Navs>}>
      <DashboardCorpus></DashboardCorpus>
    </DashboardTemplate>
  );
}

export default Dashboard;

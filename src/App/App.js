import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Routes from "../routes/routes";
import Authentication from "../Authentication";
import useAuth from "../Authentication/useAuth";

function App() {
  const provider = useAuth();

  return (
    <Authentication.Provider value={provider}>
      <BrowserRouter>
        <Switch>
          <Routes></Routes>
        </Switch>
      </BrowserRouter>
    </Authentication.Provider>
  );
}

export default App;

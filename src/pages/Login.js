import React, { useContext } from "react";

import LoginTemplate from "../templates/LoginTemplate";

import LoginTitle from "../components/atoms/LoginTitle";
import LoginForm from "../components/organisms/LoginForm";

import { Redirect } from "react-router-dom";
import Authentication from "../Authentication";

export default function Login() {
  const { auth } = useContext(Authentication);

  if (auth.loading) {
    return null;
  }

  if (auth.isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <LoginTemplate
      title={<LoginTitle></LoginTitle>}
      form={<LoginForm></LoginForm>}
    ></LoginTemplate>
  );
}

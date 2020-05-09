import React from "react";
import LoginTemplate from "../templates/LoginTemplate";

import LoginTitle from "../components/atoms/LoginTitle";
import LoginForm from "../components/organisms/LoginForm";

export default function Login() {
  return (
    <LoginTemplate
      title={<LoginTitle></LoginTitle>}
      form={<LoginForm></LoginForm>}
    ></LoginTemplate>
  );
}

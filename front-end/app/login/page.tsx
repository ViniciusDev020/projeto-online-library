"use client";
import React from "react";
import LoginForm from "./components/forms/login/form-login";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  />;
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ marginLeft: "120px" }}
    >
      <LoginForm></LoginForm>
    </div>
  );
};
export default Login;

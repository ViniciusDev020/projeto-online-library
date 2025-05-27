"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterForm from "./components/forms/register/form-register";

const Register = () => {
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
      <RegisterForm></RegisterForm>
    </div>
  );
};
export default Register;

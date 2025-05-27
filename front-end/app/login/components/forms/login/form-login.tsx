import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { login } from "../../../../api/routes/login";
import { useRouter } from "next/navigation";

function LoginForm(props) {
  const [openWarningModal, setOpenWarningModal] = useState(false);

  const router = useRouter();
  async function handleSubmit() {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const message = document.getElementById("errorMessage") as HTMLElement;

    const userCredentials = {
      email: email.value,
      password: password.value,
    };

    const res = await login(userCredentials.email, userCredentials.password);

    if (res.token != null) {
      document.cookie = `token=${res.token}; path=/`;
      router.push("/livros");
    } else {
      setOpenWarningModal(true);
      message.textContent = res.message;
    }
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          paddingTop: "50px",
        }}
      >
        <div style={{ width: "400px", marginLeft: "600px", color: "black" }}>
          <h2>Realizar Login</h2>
          <Form className="">
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                name="email"
                id="email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                name="password"
                id="password"
              />
            </Form.Group>
          </Form>
          <div>
            <span
              id="errorMessage"
              style={{
                color: "red",
                display: "inline-block",
                marginRight: "193px",
                marginBottom: "10px",
              }}
            ></span>
          </div>
          <Button
            variant="secondary"
            style={{ marginRight: "10px" }}
            onClick={() => {
              router.push("/register");
            }}
          >
            Cadastre-se
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;

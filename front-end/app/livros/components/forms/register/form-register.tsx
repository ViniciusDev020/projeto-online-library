import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { registerUser } from "../../../../api/routes/livros";
import { useRouter } from "next/navigation";
import { userType } from "../../../../types/tipoUser";
import SuccessModal from "../../../../components/modals/successModal";

function RegisterForm(props) {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseSuccess = () => {
    setOpenSuccessModal(false);
  };

  const router = useRouter();

  async function handleSubmit() {
    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const profile = document.getElementById("profile") as HTMLInputElement;

    const userCredentials: userType = {
      name: name.value,
      email: email.value,
      password: password.value,
      profile: profile.value,
    };

    const res = await registerUser(userCredentials);

    if (res.status == 201) {
      setModalMessage("Usuário Cadastrado com sucesso!");
      setOpenSuccessModal(true);
    }
    if (res.status == 400) {
      setModalMessage("Email já Cadastrado!");
      setOpenSuccessModal(true);
    }
  }

  const options = ["usuario", "admin"];

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
          <h2>Realizar Cadastro</h2>
          <Form className="">
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="" name="name" id="name" />
            </Form.Group>
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
            <Form.Group className="mb-3">
              <Form.Label>Perfil de Acesso</Form.Label>
              <Form.Select name="profile" required={true} id="profile">
                {options.map((i: string) => {
                  if (i)
                    return (
                      <option value={i} key={i}>
                        {i}
                      </option>
                    );
                })}
              </Form.Select>
              <span id="message"></span>
            </Form.Group>
          </Form>
          <Button
            variant="secondary"
            style={{ marginRight: "10px" }}
            onClick={handleSubmit}
          >
            Cadastre-se
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
      <div>
        <SuccessModal
          show={openSuccessModal}
          hideSuccessModal={() => {
            handleCloseSuccess();
          }}
          message={modalMessage}
        ></SuccessModal>
      </div>
    </>
  );
}

export default RegisterForm;

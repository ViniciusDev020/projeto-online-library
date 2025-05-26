import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { registerUser } from "../../../../api/routes/livros";
import { useRouter } from "next/navigation";
import { userType } from "../../../../types/tipoUser";
import SuccessModal from "../../../../components/modals/successModal";

function RegisterForm(props) {
  const [openWarningModal, setOpenWarningModal] = useState(false);
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

    if (res.status == 200) {
      setModalMessage("Usuário Cadastrado com sucesso!");
      setOpenSuccessModal(true);
    } else {
      setModalMessage("Falha ao cadastrar usuário!");
    }
  }

  const options = ["usuario", "admin"];

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          justifyItems: "center",
          paddingTop: "50px",
          marginLeft: "120px",
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
          <div>
            <dialog
              open={openWarningModal}
              style={{
                width: "400px",
                height: "40px",
                backgroundColor: "lightyellow",
                border: "none",
                marginTop: "10px",
                padding: "5px",
              }}
            >
              <span
                id="errorMessage"
                style={{
                  color: "red",
                  display: "inline-block",
                  marginRight: "193px",
                }}
              ></span>
              <button
                style={{ fontSize: "12px", border: "none" }}
                onClick={() => {
                  setOpenWarningModal(false);
                }}
              >
                X
              </button>
            </dialog>
          </div>
        </div>
      </div>
      <div>
        <SuccessModal
          show={openSuccessModal}
          hideSuccessModal={() => {
            handleCloseSuccess();
            router.push("/login");
          }}
          message={modalMessage}
        ></SuccessModal>
      </div>
    </>
  );
}

export default RegisterForm;

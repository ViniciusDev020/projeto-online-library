import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { criarLivro } from "../../../fetch";
import { Book } from "../../../../types/tipoLivro";
import { CreateButton } from "../../buttons/buttons";
import Cookies from "js-cookie";

function CreateForm(props) {
  const [openModal, setOpenModal] = useState(false);
  const [validated, setValidate] = useState(false);
  const { refetch } = props;

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  const validation = () => {
    const name = document.getElementById("name") as HTMLInputElement;
    const desc = document.getElementById("desc") as HTMLInputElement;

    if (desc.value.length >= 10 && name.value.length >= 10) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  function handleSubmit() {
    const name = document.getElementById("name") as HTMLInputElement;
    const desc = document.getElementById("desc") as HTMLInputElement;
    const token = Cookies.get("token");

    const newBook: Book = {
      name: name?.value,
      description: desc?.value,
    };

    if (validated) criarLivro(newBook, token);
    refetch();
  }

  let disableInput = validated == false ? true : false;

  return (
    <>
      <CreateButton onClick={handleOpen} className="btn btn-light">
        Novo Livro
      </CreateButton>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="name"
                id="name"
                required={true}
                onInput={(e) => {
                  validation();
                  let message = document.getElementById("message");
                  if (e.currentTarget.value.length < 10 && message) {
                    message.innerHTML =
                      "O nome deve possuir pelo menos 5 caracteres";
                  } else if (message) {
                    message.innerHTML = "";
                  }
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="description"
                required={true}
                id="desc"
                onInput={(e) => {
                  validation();
                  let message = document.getElementById("message");
                  if (e.currentTarget.value.length < 10 && message) {
                    message.innerHTML =
                      "A descrição deve possuir pelo menos 10 caracteres";
                  } else if (message) {
                    message.innerHTML = "";
                  }
                }}
              />
              <span id="message"></span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={disableInput}
            onClick={() => {
              handleSubmit();
              refetch();
            }}
          >
            Criar Livro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateForm;

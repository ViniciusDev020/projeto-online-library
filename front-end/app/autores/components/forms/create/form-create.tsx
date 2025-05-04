import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { criarAutor } from "../../../../hooks/useAuthors/index";
import { CreateButton } from "../../../../components/buttons/buttons";
import Cookies from "js-cookie";
import { Author } from "../../../../types/tipoAutor";

function CreateForm(props) {
  const [openModal, setOpenModal] = useState(false);
  const [validated, setValidate] = useState(false);
  const { refetch, className } = props;
  const token = Cookies.get("token");

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  const validation = () => {
    const name = document.getElementById("name") as HTMLInputElement;

    if (name.value != "") {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  function handleSubmit() {
    const name = document.getElementById("name") as HTMLInputElement;

    const newAuthor: Author = {
      name: name?.value,
    };

    if (validated) criarAutor(newAuthor, token);
    refetch();
  }

  let disableInput = validated == false ? true : false;

  return (
    <>
      <CreateButton onClick={handleOpen} className={className.buttons}>
        Novo Autor
      </CreateButton>
      <Modal
        show={openModal}
        onHide={handleClose}
        contentClassName={className.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Novo Autor</Modal.Title>
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
            Criar Autor
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateForm;

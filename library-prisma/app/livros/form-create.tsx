import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { criarLivro } from "./fetch";
import { Book } from "../types/tipoLivro";
import { FaPlusSquare } from "react-icons/fa";

function CreateForm(props) {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  function handleSubmit() {
    const name = document.getElementById("name") as HTMLInputElement;
    const desc = document.getElementById("desc") as HTMLInputElement;
    const token = document.cookie.replace("token=", "");

    const newBook: Book = {
      name: name.value,
      description: desc.value,
    };

    criarLivro(newBook, token);
  }

  return (
    <>
      <Button onClick={handleOpen} variant="secondary">
        <FaPlusSquare style={{ marginRight: "10px" }} />
        Criar Livro
      </Button>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="" name="name" id="name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="description"
                id="desc"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Criar Livro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateForm;

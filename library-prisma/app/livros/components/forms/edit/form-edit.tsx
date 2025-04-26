import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Book } from "../../../../types/tipoLivro";
import { FaRegEdit } from "react-icons/fa";
import { editarLivro } from "../../../../api/routes";
import { EditButton } from "../../buttons/buttons";

function EditForm(props) {
  const { id } = props;
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  function handleSubmit(method) {
    const name = document.getElementById("name") as HTMLInputElement;
    const desc = document.getElementById("desc") as HTMLInputElement;
    const token = document.cookie.replace("token=", "");

    const newBook: Book = {
      id: id,
      name: name.value,
      description: desc.value,
    };

    const objectWithoutEmptyProperties = Object.fromEntries(
      Object.entries(newBook).filter(([p, v]) => v != "")
    );

    editarLivro(objectWithoutEmptyProperties, token);
  }

  return (
    <>
      <EditButton onClick={handleOpen} className="btn btn-light" />
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Livro</Modal.Title>
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
            Editar Livro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditForm;

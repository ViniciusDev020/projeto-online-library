import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { editarLivro } from "../../../../api/routes/livros";
import { EditButton } from "../../buttons/buttons";
import Cookies from "js-cookie";
import { BookUpdate } from "../../../../types/tipoLivro";

function EditForm(props) {
  const { id, className } = props;
  const { refetch } = props;
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
    const token = Cookies.get("token");

    const newBook: BookUpdate = {
      id: id,
      name: name.value,
      description: desc.value,
    };

    const objectWithoutEmptyProperties = Object.fromEntries(
      Object.entries(newBook).filter(([p, v]) => v != "")
    );

    editarLivro(objectWithoutEmptyProperties, token);
    refetch();
  }
  return (
    <>
      <EditButton onClick={handleOpen} className={className.buttons} />
      <Modal
        show={openModal}
        onHide={handleClose}
        contentClassName={className.modals}
      >
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
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleSubmit();
              refetch();
            }}
          >
            Editar Livro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditForm;

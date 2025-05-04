import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { editarLivro } from "../../../../api/routes/livros";
import { EditButton } from "../../../../components/buttons/buttons";
import Cookies from "js-cookie";
import { BookUpdate } from "../../../../types/tipoLivro";
import SuccessModal from "../../../../components/modals/successModal";
import { Author } from "../../../../types/tipoAutor";
import { editarAutor } from "../../../../api/routes/autores";

function EditForm(props) {
  const { id, className } = props;
  const { refetch } = props;
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleCloseSuccess = () => {
    setOpenSuccessModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  function handleSubmit() {
    const name = document.getElementById("name") as HTMLInputElement;
    const token = Cookies.get("token");

    const newAuthor: Author = {
      id: id,
      name: name.value,
    };

    const objectWithoutEmptyProperties = Object.fromEntries(
      Object.entries(newAuthor).filter(([p, v]) => v != "")
    );

    editarAutor(objectWithoutEmptyProperties, token);
    setOpenModal(false);
    setOpenSuccessModal(true);
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
      <div>
        <SuccessModal
          show={openSuccessModal}
          hideSuccessModal={() => {
            handleCloseSuccess();
          }}
          message="O autor foi editado com sucesso!"
        ></SuccessModal>
      </div>
    </>
  );
}

export default EditForm;

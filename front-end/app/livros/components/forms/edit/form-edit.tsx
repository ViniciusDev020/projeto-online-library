import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { EditButton } from "../../../../components/buttons/buttons";
import Cookies from "js-cookie";
import { BookUpdate } from "../../../../types/tipoLivro";
import SuccessModal from "../../../../components/modals/successModal";
import { editarLivro } from "../../../../api/routes/livros";

function EditForm(props) {
  const { id, className } = props;
  const { refetch } = props;
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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

    const editBook = async () => {
      const res = await editarLivro(objectWithoutEmptyProperties, token);
      handleClose();

      if (res.status == 401) {
        setModalMessage("Não foi possível editar o livro!");
        setOpenSuccessModal(true);
      }
      if (res.status == 200) {
        setModalMessage("O livro foi editado com sucesso!");
        setOpenSuccessModal(true);
      }
    };

    editBook();
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

export default EditForm;

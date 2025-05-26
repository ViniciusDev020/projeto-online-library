import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { EditButton } from "../../../../components/buttons/buttons";
import Cookies from "js-cookie";
import SuccessModal from "../../../../components/modals/successModal";
import { Author, AuthorUpdate } from "../../../../types/tipoAutor";
import { editarAutor } from "../../../../api/routes/autores";

function EditForm(props) {
  const { id, className } = props;
  const { refetch } = props;
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
    const nacionality = document.getElementById(
      "nacionality"
    ) as HTMLInputElement;
    const age = document.getElementById("age") as HTMLInputElement;

    const token = Cookies.get("token");

    const newAuthor: AuthorUpdate = {
      id: id,
      name: name.value,
      nacionality: nacionality.value,
      age: age.value,
    };

    const objectWithoutEmptyProperties = Object.fromEntries(
      Object.entries(newAuthor).filter(([p, v]) => v != "")
    );

    const editAuthor = async () => {
      const res = await editarAutor(objectWithoutEmptyProperties, token);

      if (res.status == 401) {
        setModalMessage("Não foi possível editar o autor!");
        setOpenSuccessModal(true);
      }
      if (res.status == 200) {
        setModalMessage("O autor foi editado com sucesso!");
        setOpenSuccessModal(true);
      }
    };

    editAuthor();
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
          <Modal.Title>Editar Autor</Modal.Title>
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nacionalidade</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="nacionality"
                id="nacionality"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Idade</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="age"
                id="age"
                required
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
            Editar Autor
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

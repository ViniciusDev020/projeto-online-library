import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BookCreate } from "../../../../types/tipoLivro";
import { CreateButton } from "../../../../components/buttons/buttons";
import Cookies from "js-cookie";
import useFetchAuthors from "../../../../hooks/useAuthors/fetch-authors";
import SuccessModal from "../../../../components/modals/successModal";
import { Author } from "../../../../types/tipoAutor";
import { criarNovoLivro } from "../../../../api/routes/livros";

function CreateForm(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [validated, setValidate] = useState(false);
  const token = Cookies.get("token");

  const { className, refetch } = props;
  const { data } = useFetchAuthors("", {
    page: 1,
    limit: 50,
  });

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleCloseSuccess = () => {
    setOpenSuccessModal(false);
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
    const author = document.getElementById("author") as HTMLSelectElement;

    const newBook: BookCreate = {
      name: name?.value,
      description: desc?.value,
      authorId: author.selectedOptions[0].value,
    };

    const createBook = async () => {
      const res = await criarNovoLivro(newBook, token);

      if (res.status == 401) {
        setModalMessage("Não foi possível criar o livro!");
        setOpenSuccessModal(true);
      }
      if (res.status == 201) {
        setModalMessage("O livro foi criado com sucesso!");
        setOpenSuccessModal(true);
      }
    };
    if (validated) {
      createBook();
    }

    handleClose();
    refetch();
  }

  let disableInput = validated == false ? true : false;

  const dataToMap: Author[] = data?.items == null ? [] : data?.items;

  return (
    <>
      <CreateButton onClick={handleOpen} className={className.buttons}>
        Novo Livro
      </CreateButton>
      <Modal
        show={openModal}
        onHide={handleClose}
        contentClassName={className.modal}
      >
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
            <Form.Group className="mb-3">
              <Form.Label>Autor</Form.Label>
              <Form.Select
                name="author"
                required={true}
                id="author"
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
              >
                {dataToMap.map((i: Author) => {
                  if (i)
                    return (
                      <option value={i.id} key={i.id}>
                        {i.name}
                      </option>
                    );
                })}
              </Form.Select>
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

export default CreateForm;

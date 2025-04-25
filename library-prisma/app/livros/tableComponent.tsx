import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "./buttons";
import { useState } from "react";
import { responseObject } from "./book-values";
import { deletarLivro } from "../api/routes";
import CreateForm from "./form-create";
import EditForm from "./form-edit";

export const TableComponent = () => {
  const books = responseObject;

  const token = document.cookie.replace("token=", "");
  const router = useRouter();

  const [id, setId] = useState("");

  const deleteBook = async () => {
    if (id) {
      await deletarLivro(id, token);
      router.refresh();
    }
  };

  function handleClick(id: string) {
    setId(id);
  }

  useEffect(() => {
    deleteBook();
  });

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  />;

  return (
    <div className="container">
      <h1 className="text-3xl font-0 underline text-center">
        Biblioteca de Livros
      </h1>

      <div className="">
        <CreateForm className="modal-body" />
      </div>

      <table className="table table-striped wit">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book, index) => {
            return (
              <tr key={index}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.description}</td>
                <td>
                  <DeleteButton
                    id="delete"
                    onClick={() => {
                      handleClick(book.id);
                    }}
                  />
                </td>
                <td>
                  <EditForm id={book.id}></EditForm>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

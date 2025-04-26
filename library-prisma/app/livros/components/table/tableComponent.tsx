import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "../buttons/buttons";
import { useState } from "react";
import { responseObject } from "../../book-values";
import { deletarLivro } from "../../../api/routes";
import CreateForm from "../forms/create/form-create";
import EditForm from "../forms/edit/form-edit";
import truncateString from "../formatters/truncate"

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
      <h1 className="text-3xl font-0 underline text-center text-white">
        Biblioteca de Livros
      </h1>

      <div className="">
        <CreateForm className="modal-body" />
      </div>

      <table className="table table-dark table-striped">
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
                <td>
                  <span>{truncateString(book.description, 10)}</span>
                <div 
                className="btn-group gap-2"
                style={{justifyContent:"center", width: "100px", marginLeft: "100px"}}
                >
                <DeleteButton
                  id="delete"
                  onClick={() => {
                    handleClick(book.id);
                  }}
                  />
                <EditForm 
                 id={book.id}
                />
                </div>
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

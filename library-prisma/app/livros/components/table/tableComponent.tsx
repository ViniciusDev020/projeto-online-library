import React from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "../buttons/buttons";
import useDataFetch from "../../data-fetch";
import { deletarLivro } from "../../../api/routes";
import CreateForm from "../forms/create/form-create";
import EditForm from "../forms/edit/form-edit";
import truncateString from "../formatters/truncate";
import NavigationBar from "../navigationBar/NavigationBar";
import { LoadingComponent } from "../loading/LoadingComponent";
import { Book } from "../../../types/tipoLivro";

import Cookies from "js-cookie";

export const TableComponent = () => {
  const { data: books, refetch } = useDataFetch();
  const token = Cookies.get("token");
  const router = useRouter();

  const deleteBook = async (id?: string) => {
    if (id) {
      await deletarLivro(id, token);
      refetch();
    }
  };

  function handleLogout() {
    Cookies.remove("token");
    router.refresh();
  }

  const dataToMap: Book[] = books == null ? [] : books;

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  />;

  return (
    <div className="container">
      <NavigationBar onClick={handleLogout} />

      <div className="btn-group mt-4 gap-2">
        <input type="search" placeholder="Pesquisar"></input>
        <CreateForm className="modal-body" refetch={refetch} />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {dataToMap?.map((book, index) => {
            return (
              <tr key={index}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>
                  <div
                    className="d-inline-block bg-primary"
                    style={{ width: "100px" }}
                  >
                    {truncateString(book.description, 10)}
                  </div>
                  <div
                    className="btn-group gap-2"
                    style={{
                      justifyContent: "center",
                      width: "100px",
                      marginLeft: "100px",
                    }}
                  >
                    <DeleteButton
                      id="delete"
                      className="btn btn-light"
                      onClick={() => {
                        deleteBook(book?.id);
                      }}
                    />
                    <EditForm id={book.id} refetch={refetch} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {dataToMap.length == 0 && <LoadingComponent></LoadingComponent>}
    </div>
  );
};

export default TableComponent;

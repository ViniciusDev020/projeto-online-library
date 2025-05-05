import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "../../../components/buttons/buttons";
import useFetchBooks from "../../../hooks/useBooks/fetch-books";
import { deletarLivro } from "../../../api/routes/livros";
import CreateForm from "../forms/create/form-create";
import EditForm from "../forms/edit/form-edit";
import truncateString from "../../../components/formatters/truncate";
import NavigationBar from "../../../components/navigationBar/NavigationBar";
import { LoadingComponent } from "../../../components/loading/LoadingComponent";
import { Book } from "../../../types/tipoLivro";
import PaginationComponent from "../../../components/pagination/PaginationComponent";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import SuccessModal from "../../../components/modals/successModal";

export const TableComponent = (props) => {
  const [searchParams, setSearchParams] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const { data, refetch, isLoading } = useFetchBooks(searchParams, {
    limit: limit,
    page: page,
  });
  const token = Cookies.get("token");
  const router = useRouter();

  const deleteBook = async (id?: string) => {
    if (id) {
      await deletarLivro(id, token);
      setOpenSuccessModal(true);
      refetch();
    }
  };

  function handleLogout() {
    Cookies.remove("token");
    router.refresh();
  }
  const handleCloseSuccess = () => {
    setOpenSuccessModal(false);
  };

  const { className } = props;

  const dataToMap: Book[] = data?.items == null ? [] : data.items;

  useEffect(() => {
    refetch();
  }, [searchParams, page]);

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  />;

  return (
    <div className="container">
      <NavigationBar onClick={handleLogout} className={className.header} />

      <div className="btn-group mt-4 gap-2" style={{ marginBottom: "20px" }}>
        <input
          type="search"
          placeholder="Pesquisar"
          onInput={(e) => {
            setSearchParams(e.currentTarget.value);
          }}
        ></input>
        <CreateForm
          className={{
            modal: className.modals,
            buttons: className.buttons,
          }}
          refetch={refetch}
        />
        <Button className={className.buttons}>
          Filtrar <FaFilter></FaFilter>
        </Button>
      </div>
      <table className={className.table}>
        <thead>
          <tr>
            <th>Autor</th>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {dataToMap?.map((book, index) => {
            return (
              <tr key={index}>
                <td>{book.author?.name}</td>
                <td>{book.name}</td>
                <td>
                  <div className="d-inline-block" style={{ width: "115px" }}>
                    {truncateString(book.description, 14)}
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
                      className={className.buttons}
                      onClick={() => {
                        deleteBook(book?.id);
                      }}
                    />
                    <EditForm
                      id={book.id}
                      refetch={refetch}
                      className={{
                        modals: className.modals,
                        buttons: className.buttons,
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && <LoadingComponent></LoadingComponent>}
      <div>
        <SuccessModal
          show={openSuccessModal}
          hideSuccessModal={() => {
            handleCloseSuccess();
          }}
          message="O livro foi deletado com sucesso!"
        ></SuccessModal>
      </div>
      <PaginationComponent
        total={data?.total}
        limit={limit}
        setPage={setPage}
      ></PaginationComponent>
    </div>
  );
};

export default TableComponent;

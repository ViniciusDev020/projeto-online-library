import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteButton from "../../../components/buttons/buttons";
import CreateForm from "../forms/create/form-create";
import EditForm from "../forms/edit/form-edit";
import NavigationBar from "../../../components/navigationBar/NavigationBar";
import { LoadingComponent } from "../../../components/loading/LoadingComponent";
import useFetchAuthors from "../../../hooks/useAuthors/fetch-authors";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { Author } from "../../../types/tipoAutor";
import { deletarAutor } from "../../../api/routes/autores";
import SuccessModal from "../../../components/modals/successModal";
import PaginationComponent from "../../../components/pagination/PaginationComponent";

export const TableComponent = (props) => {
  const [searchParams, setSearchParams] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, refetch, isLoading } = useFetchAuthors(searchParams, {
    limit: limit,
    page: page,
  });
  const token = Cookies.get("token");
  const router = useRouter();

  const deleteAuthor = async (id?: string) => {
    if (id) {
      const res = await deletarAutor(id, token);

      if (res.status == 401) {
        setModalMessage("Não foi possível deletar o autor!");
        setOpenSuccessModal(true);
      }
      if (res.status == 200) {
        setModalMessage("O autor foi deletado com sucesso!");
        setOpenSuccessModal(true);
      }
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

  const dataToMap: Author[] = data?.items == null ? [] : data?.items;

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
      <NavigationBar
        onClick={handleLogout}
        className="navbar navbar-expand-lg navbar-light bg-white"
      />

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
            buttons: "btn btn-light",
          }}
          refetch={refetch}
        />
      </div>
      <table className="table table-white">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Nacionalidade</th>
          </tr>
        </thead>
        <tbody>
          {dataToMap?.map((author, index) => {
            return (
              <tr key={index}>
                <td>{author.name}</td>
                <td>{author.age}</td>
                <td>
                  <div className="d-inline-block" style={{ width: "115px" }}>
                    {author.nacionality}
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
                        deleteAuthor(author?.id);
                      }}
                    />
                    <EditForm
                      id={author.id}
                      refetch={refetch}
                      className={{
                        modals: "bg-light text-dark",
                        buttons: "btn btn-light",
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
          message={modalMessage}
        ></SuccessModal>
      </div>
      <PaginationComponent
        total={data?.total}
        limit={limit}
        setPage={setPage}
        page={page}
      ></PaginationComponent>
    </div>
  );
};

export default TableComponent;

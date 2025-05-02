import { useEffect, useState } from "react";
import { listarAutores } from "../../api/routes/autores";
import Cookies from "js-cookie";

const useFetchAuthors = () => {
  const [data, setData] = useState([null]);
  const token = Cookies.get("token");

  const fetchData = async () => {
    console.log("fetch data foi executado");
    const res = await listarAutores(token);

    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, refetch: fetchData };
};

export default useFetchAuthors;

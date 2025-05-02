import { useEffect, useState } from "react";
import listarLivros from "../../api/routes/livros";
import Cookies from "js-cookie";

const useFetchBooks = (searchParams?: string) => {
  const [data, setData] = useState(null);
  const token = Cookies.get("token");

  const fetchData = async () => {
    console.log("fetch data foi executado");
    const res = await listarLivros(token, searchParams);

    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, refetch: fetchData };
};

export default useFetchBooks;

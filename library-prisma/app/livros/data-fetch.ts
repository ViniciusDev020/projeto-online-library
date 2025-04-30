import { useEffect, useState } from "react";
import listarLivros from "../api/routes";
import Cookies from "js-cookie";

const useDataFetch = () => {
  const [data, setData] = useState(null);
  const token = Cookies.get("token");

  const fetchData = async () => {
    console.log("fetch data foi executado");
    const res = await listarLivros(token);

    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, refetch: fetchData };
};

export default useDataFetch;

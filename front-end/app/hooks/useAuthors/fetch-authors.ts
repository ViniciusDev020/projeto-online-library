import { useEffect } from "react";
import { listarAutores } from "../../api/routes/autores/index";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

const useFetchAuthors = (searchParams?: string) => {
  const token = Cookies.get("token");

  const fetchData = async () => {
    console.log("fetch data foi executado");
    const res = await listarAutores(token, searchParams);

    return res;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["dadosAutores"],
    queryFn: fetchData,
  });

  return { data, refetch, isLoading, error };
};

export default useFetchAuthors;

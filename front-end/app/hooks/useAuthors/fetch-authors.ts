import { useEffect } from "react";
import { listarAutores } from "../../api/routes/autores/index";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { pagination } from "../../types/pagination";

const useFetchAuthors = (searchParams: string, pagination: pagination) => {
  const token = Cookies.get("token");

  const fetchData = async () => {
    const res = await listarAutores(token, searchParams, pagination);

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

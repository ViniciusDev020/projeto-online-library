import { useEffect } from "react";
import listarLivros from "../../api/routes/livros/index";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import type { pagination } from "../../types/pagination";

const useFetchBooks = (searchParams?: string, pagination?: pagination) => {
  const token = Cookies.get("token");

  const fetchData = async () => {
    const res = await listarLivros(token, searchParams, pagination);

    return res;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["dadosLivros"],
    queryFn: fetchData,
  });

  return { data, refetch, isLoading, error };
};

export default useFetchBooks;

import { useEffect } from "react";
import listarLivros from "../../api/routes/livros/index";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

const useFetchBooks = (searchParams?: string) => {
  const token = Cookies.get("token");

  const fetchData = async () => {
    const res = await listarLivros(token, searchParams);

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

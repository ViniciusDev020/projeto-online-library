"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { TableComponent } from "./components/table/tableComponent";
import { useRouter } from "next/navigation";

export default function page() {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  />;
  const router = useRouter();
  const token = Cookies.get("token");
  const queryClient = new QueryClient();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <TableComponent />
      </div>
    </QueryClientProvider>
  );
}

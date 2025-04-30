"use client";

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

  function handleLogout() {
    Cookies.remove("token");
    router.refresh();
  }

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  });
  return (
    <div>
      <button className="btn btn-link" onClick={handleLogout}>
        Logout
      </button>
      <TableComponent />
    </div>
  );
}

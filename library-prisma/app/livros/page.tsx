"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TableComponent } from "./tableComponent";
import { useRouter } from "next/navigation";

export default function page() {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  />;
  const router = useRouter();
  const token = document.cookie.replace("token=", "");

  function handleLogout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.refresh();
  }

  if (!token) {
    router.push("/login");
  }
  return (
    <body>
      <div>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
        <TableComponent />
      </div>
    </body>
  );
}

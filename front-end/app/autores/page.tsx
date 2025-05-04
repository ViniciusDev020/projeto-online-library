"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
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

  const [tableStyle, setTableStyle] = useState("table table-white");
  const [tableButtonsStyle, setTableButtonsStyle] = useState("btn btn-light");
  const [headerStyle, setHeaderStyle] = useState(
    "navbar navbar-expand-lg navbar-light bg-white"
  );
  const [modalsTheme, setModalsTheme] = useState("bg-light text-dark");

  function handleLogout() {
    Cookies.remove("token");
    router.refresh();
  }

  function handleTheme() {
    const themeButton = document.getElementById(
      "theme-button"
    ) as HTMLInputElement;

    const currentTheme = document.getElementById(
      "current-theme"
    ) as HTMLInputElement;

    if (themeButton.checked) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";

      currentTheme.innerText = "Dark";
      setHeaderStyle("navbar navbar-expand-lg navbar-dark bg-black");
      setTableStyle("table table-dark");
      setTableButtonsStyle("btn btn-dark");
      setModalsTheme("bg-dark text-white");
    }

    if (themeButton.checked == false) {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";

      currentTheme.innerText = "Light";
      setHeaderStyle("navbar navbar-expand-lg navbar-light bg-white");
      setTableStyle("table table-white");
      setTableButtonsStyle("btn btn-light");
      setModalsTheme("bg-light text-dark");
    }
  }

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="theme-button"
            onChange={handleTheme}
          ></input>
          <label className="form-check-label">
            Change Theme: <span id="current-theme">Light</span>
          </label>
        </div>
        <TableComponent
          className={{
            table: tableStyle,
            header: headerStyle,
            buttons: tableButtonsStyle,
            modals: modalsTheme,
          }}
        />
      </div>
    </QueryClientProvider>
  );
}

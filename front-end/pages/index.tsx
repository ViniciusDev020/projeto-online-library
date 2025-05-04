"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { LoadingComponent } from "../app/components/loading/LoadingComponent";

export default function page() {
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  />;
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      router.push("/livros");
    }
  });

  return (
    <div>
      <LoadingComponent></LoadingComponent>
    </div>
  );
}

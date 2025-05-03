"use client";
import React from "react";
import { FaRegEdit, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";

export default function DeleteButton(props) {
  return (
    <button
      value={props.value}
      onClick={props.onClick}
      id={props.id}
      className={props.className}
    >
      {" "}
      <FaRegTrashAlt />
    </button>
  );
}

export function EditButton(props) {
  return (
    <button
      value={props.value}
      onClick={props.onClick}
      className={props.className}
    >
      <FaRegEdit />
    </button>
  );
}

export function CreateButton(props) {
  return (
    <button
      value={props.value}
      onClick={props.onClick}
      className={props.className}
    >
      {props.children}
      <FaRegPlusSquare />
    </button>
  );
}

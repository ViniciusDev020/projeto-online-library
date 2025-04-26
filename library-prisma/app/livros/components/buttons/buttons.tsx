"use client"
import React from "react";
import { FaRegEdit, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";

export default function DeleteButton(props) {
 
  return <button value={props.value} onClick={props.onClick} id={props.id} className="btn btn-dark"> <FaRegTrashAlt/></button>;
}

export function EditButton(props) {
 
    return <button value={props.value} onClick={props.onClick} className="btn btn-dark"><FaRegEdit/></button>;
}

export function CreateButton(props) {
 
  return <button value={props.value} onClick={props.onClick} className="btn btn-dark"><FaRegPlusSquare/> </button>;
}
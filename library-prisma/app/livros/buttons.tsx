"use client"
import React from "react";
import { FaRegEdit, FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";

export default function DeleteButton(props) {
 
  return <button value={props.value} onClick={props.onClick} id={props.id}> <FaRegTrashAlt/></button>;
}

export function EditButton(props) {
 
    return <button value={props.value} onClick={props.onClick}><FaRegEdit/></button>;
}

export function CreateButton(props) {
 
  return <button value={props.value} onClick={props.onClick}><FaRegPlusSquare/> </button>;
}
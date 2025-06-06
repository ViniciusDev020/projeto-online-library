import React from "react";
import { FaBook } from "react-icons/fa";

function NavigationBar(props) {
  const { className } = props;
  return (
    <header className="bg-black w-[30px] text-white">
      <nav className={className}>
        <a className="navbar-brand" href="#">
          <FaBook className="m-2"></FaBook>
          Online Library
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#">
              Home
            </a>
            <a className="nav-item nav-link" href="/livros">
              Livros
            </a>
            <a className="nav-item nav-link" href="/autores">
              Autores
            </a>
            <a className="nav-item nav-link" href="#" onClick={props.onClick}>
              Logout
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavigationBar;

import React, { useState, useEffect } from "react";
import axios from "axios";

import jwt_decode from "jwt-decode";

import { Button } from "reactstrap";

import { p, container } from "./ReservedBooks.styles";

import BookCard from "../BookCard/BookCard";
import RegisterBookButton from "../RegisterBookButton/RegisterBookButton";

const api = "http://localhost:3001/Books";

const ReservedBooksList = () => {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(api + "/reserved");
      setBooks(data);
    };

    adminVerify();
    fetchData();
  }, []);

  function decodeToken() {
    return jwt_decode(localStorage.getItem("token"));
  }

  function adminVerify() {
    const decodedToken = decodeToken();
    console.log(decodedToken);

    if (decodedToken.profileJson.access == 2) {
      setIsAdmin(true);
      console.log(isAdmin);
    } else {
      setIsAdmin(false);
      console.log(isAdmin);
    }
  }

  if (books.length < 1 && isAdmin == true) {
    return (
      <>
        <div style={container}>
          <p style={p}>
            Nenhum livro foi reservado ainda.
          </p>
          <RegisterBookButton></RegisterBookButton>
        </div>
      </>
    );
  } else if (books.length < 1 && isAdmin === false) {
    return (
      <>
        <div style={container}>
          <p style={p}>Nenhum livro foi reservado ainda.</p>
        </div>
      </>
    );
  } else if (books.length > 0 && isAdmin) {
    return (
      <>
        <div style={container}>
          <p style={p}>
            Bem vindo, Aqui estão nossos livros que já foram reservados.
          </p>
        </div>
        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </>
    );
  } else if (books.length > 0 && isAdmin == false) {
    return (
      <>
        <div style={container}>
          <p style={p}>Bem vindo, Aqui estão nossos livros que já foram reservados.</p>
        </div>

        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </>
    );
  }
};

export default ReservedBooksList;

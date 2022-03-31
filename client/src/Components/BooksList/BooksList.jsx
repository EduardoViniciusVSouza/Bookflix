import React, { useState, useEffect } from "react";
import axios from "axios";

import jwt_decode from "jwt-decode";

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

import { p, container } from "./Books.style";

import BookCard from "../BookCard/BookCard";
import RegisterBookButton from "../RegisterBookButton/RegisterBookButton";



const api = "http://localhost:3001/Books";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(api)
      setBooks(data);
      
    };

    adminVerify()
    fetchData();
  }, []);



  function decodeToken() {
    return jwt_decode(localStorage.getItem("token"));
  }

  function adminVerify() {
    const decodedToken = decodeToken();
    console.log(decodedToken)

    if (decodedToken.profileJson.access == 2) {
      setIsAdmin(true)
      console.log(isAdmin)
    } else {
      setIsAdmin(false)
      console.log(isAdmin)
    }
  }


  if (books.length < 1 && isAdmin == true) {

    return (
      <>
        <div style={container}>
          <p style={p}>
            Ops, Parece que estamos sem livros, deseja cadastrar um?
          </p>
          <RegisterBookButton></RegisterBookButton>
        </div>
      </>
    );
  } else if (books.length < 1 && isAdmin === false) {

    return (
      <>
        <div style={container}>
          <p style={p}>Ops, Parece que estamos sem livros, Volte mais tarde.</p>
        </div>
      </>
    );
  } else if (books.length > 0 && isAdmin) {

    return (
      <>
        <div style={container}>
          <p style={p}>Bem vindo, Aqui estão nossos livros disponíveis, deseja cadastrar mais algum?</p>
          <RegisterBookButton></RegisterBookButton>
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
          <p style={p}>Bem vindo, Aqui estão nossos livros disponíveis</p>
        </div>

        {books.map((book) => (
          <BookCard book={book} />
        ))}
      </>
    );
  }
};

export default BooksList;

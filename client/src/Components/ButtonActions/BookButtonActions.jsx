import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import verifyAdmin from "../../Functions/verifyAdmin";
import { buttonAlterar, buttonRemover, p } from "./BookButtonActions.styles";

import ModalEditBook from "../ModalEditBook/ModalEditBook";
import ModalDeleteBook from "../ModalDeleteBook/ModalDeleteBook";

const api = "http://localhost:3001/Books/";

const BookButtonActions = ({ book }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-acess-token": localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    setIsAdmin(verifyAdmin());
  }, []);

  function handleReservarClick() {
    axios.put(
      api + "reservar/" + book.bookId,
      { clientBookId: book.id },
      config
    );

    window.location.reload()
    alert('Livro reservado com sucesso!')
  }

  function handleAlterarClick() {
    axios.put(
      api + book.bookId,
      {
        // dados do livro atualizado
      },
      config
    );
  }

  if (isAdmin == false) {
    return (
      <>
        {book.profileId ? (
          <p style={p}>Reservado pelo id: {book.profileId}</p>
        ) : (
          <Button style={{ backgroundColor: "crimson" }} onClick={handleReservarClick}>Reservar</Button>
        )}
      </>
    );
  } else {
    return (
      <>
        {book.profileId ? (
          <p style={p}>Reservado pelo id: {book.profileId}</p>
        ) : (
          <Button style={{ backgroundColor: "crimson" }} onClick={handleReservarClick}>Reservar</Button>
        )}

        <Button
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
          style={buttonAlterar}
        >
          Alterar
        </Button>
        <Button
          onClick={() => {
            setModalDeleteOpen(!modalDeleteOpen);
          }}
          style={buttonRemover}
        >
          Remover
        </Button>

        <ModalDeleteBook
          book={book}
          modalDeleteOpen={modalDeleteOpen}
          setModalDeleteOpen={setModalDeleteOpen}
        />
        <ModalEditBook
          book={book}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </>
    );
  }
};

export default BookButtonActions;

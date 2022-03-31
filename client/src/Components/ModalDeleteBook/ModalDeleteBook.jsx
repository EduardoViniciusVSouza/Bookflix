import axios from "axios";
import React from "react";

import { Button, Modal, ModalFooter } from "reactstrap";

const api = "http://localhost:3001/Books/";

function ModalDeleteBook({ modalDeleteOpen, setModalDeleteOpen, book }) {

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-acess-token": localStorage.getItem("token"),
    },
  };

  function handleDeletarClick() {
    axios
      .delete(api + book.bookId, config)
      .then((req) => {
        alert("Livro Excluido com sucesso");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Modal
        toggle={() => setModalDeleteOpen(!modalDeleteOpen)}
        isOpen={modalDeleteOpen}
      >
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Atenção, tem certeza que quer deletar: {book.title}?
          </h5>
          <Button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalDeleteOpen(!modalDeleteOpen)}
          >
            <span aria-hidden={true}>X</span>
          </Button>
        </div>

        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalDeleteOpen(!modalDeleteOpen)}
          >
            Fechar
          </Button>
      
          <Button onClick={handleDeletarClick} color="danger" type="button">
            Deletar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalDeleteBook;

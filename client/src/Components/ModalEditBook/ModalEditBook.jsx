import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupText,
  Form,
} from "reactstrap";

import { blackBackground, texto } from "./ModalEdit.styles";

const api = "http://localhost:3001/Books/";

function ModalEditBook({ modalOpen, setModalOpen, book }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-acess-token": localStorage.getItem("token"),
    },
  };

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSalvarClick() {
    axios
      .put(
        api + book.bookId,
        { title: title, description: description },
        config
      )
      .then((req) => {
        alert("Livro Alterado com sucesso.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        style={blackBackground}
      >
        <div className=" modal-header" style={blackBackground}>
          <h5 className=" modal-title" style={texto} id="exampleModalLabel">
            Edição Do Livro: {book.title}
          </h5>
          <Button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>X</span>
          </Button>
        </div>

        <ModalBody style={{ backgroundColor: "#222" }}>
          <Form className={"login-form"}>
            <InputGroup>
              <InputGroupText
                style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}
                className={"input-text"}
              >
                Título
              </InputGroupText>
              <Input
                onChange={handleTitleChange}
                style={blackBackground}
                className="input"
                placeholder="Título do livro."
              />
            </InputGroup>
            <InputGroup>
              <InputGroupText
                style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}
                className={"input-text"}
              >
                Descrição
              </InputGroupText>
              <Input
                style={blackBackground}
                onChange={handleDescriptionChange}
                className="input"
                placeholder="Descrição do livro."
              />
            </InputGroup>
          </Form>
        </ModalBody>
        <ModalFooter  style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Fechar
          </Button>
          <Button onClick={handleSalvarClick} color="primary" type="button">
            Salvar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalEditBook;

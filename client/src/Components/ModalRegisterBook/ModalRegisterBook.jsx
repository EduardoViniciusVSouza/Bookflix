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

import { texto, blackBackground } from "./ModalRegister.styles";

const api = "http://localhost:3001/Books/register";

function ModalRegisterBook({ modalOpen, setModalOpen }) {
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

  function handleRegisterClick() {
    axios
      .post(api, { title: title, description: description }, config)
      .then((req) => {
        alert("Livro cadastrado com sucesso");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header" style={blackBackground}>
          <h5
            className=" modal-title"
            id="exampleModalLabel"
            style={blackBackground}
          >
            Cadastro De Livro
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

        <ModalBody style={blackBackground}>
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
                style={{ backgroundColor: "rgb(29, 29, 29)", color: 'white' }}
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
        <ModalFooter style={blackBackground}>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Fechar
          </Button>
          <Button onClick={handleRegisterClick} color="primary" type="button">
            Cadastrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalRegisterBook;

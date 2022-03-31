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

import { texto, blackBackground } from "./ModalEdit.styles";

const api = "http://localhost:3001/Profiles/";

function ModalEditProfile({ modalOpen, setModalOpen, profile }) {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-acess-token": localStorage.getItem("token"),
    },
  };

  function handleNameChange(e) {
    setName(e.target.value);
  }


  function handleSalvarClick() {
    axios
      .put(
        api + profile.profileId,
        { name: name},
        config
      )
      .then((req) => {
        alert("Usuario Alterado com sucesso");
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
          <h5 className=" modal-title" id="exampleModalLabel">
            Edição De Usuário: {profile.profileId}
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
                Nome
              </InputGroupText>
              <Input
                onChange={handleNameChange}
                style={{ backgroundColor: "rgb(29, 29, 29)", color: 'white' }}
                className="input"
                placeholder="Novo nome do usuário"
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
          <Button onClick={handleSalvarClick} color="primary" type="button">
            Salvar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalEditProfile;

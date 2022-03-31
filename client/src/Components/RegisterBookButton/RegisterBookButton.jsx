import React, { useState } from "react";

import { Container, Row, Col, Button, Modal, ModalBody, ModalFooter  } from "reactstrap";

import ModalRegisterBook from "../ModalRegisterBook/ModalRegisterBook";

const RegisterBookButton = () => {
  const [modalOpen, setModalOpen] = useState(false)


 

  return (
    <>
      <Button onClick={() => {setModalOpen(!modalOpen)}}>Cadastrar</Button>

      <ModalRegisterBook modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default RegisterBookButton;

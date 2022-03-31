import React, { useState } from "react";
import { Button, Input, InputGroup, InputGroupText, Form } from "reactstrap";
import axios from "axios";

import { p, registerButton, formFooter } from "./RegisterForm.styles";
import { useNavigate } from "react-router-dom";

const api = "http://localhost:3001";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const checkPasswords = () => {
    if (password === ConfirmPassword && username != "") {
      register();
    } else if (password != ConfirmPassword){
      alert("As senhas precisam ser iguais.");
    } else if (username == "") {
      alert("Por favor, preencha seu Username.")
    }
  };

  function register() {
    axios
      .post(api + "/Authentication/register", {
        clientEmail: email,
        clientPassword: password,
        clientUsername: username,
      })
      .then((res) => {
        if (res.data.success === true) {
          alert("Usuário cadastrado com sucesso!");
          navigate("/");
        } else {
          alert("Este E-mail já está cadastrado, tente outro.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="login-form-container">
        <h1>Registrar Usuário</h1>

        <Form className={"login-form"}>
          <InputGroup>
            <InputGroupText
              style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}
              className={"input-text"}
            >
              E-mail
            </InputGroupText>
            <Input
              onChange={handleEmailChange}
              style={{ backgroundColor: "rgb(29, 29, 29)" }}
              className="input"
              placeholder="******@gmail.com"
            />
          </InputGroup>
          <InputGroup>
            <InputGroupText
              style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}
              className={"input-text"}
            >
              Senha
            </InputGroupText>
            <Input
              onChange={handlePasswordChange}
              style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}
              className="input"
              placeholder="********"
            />
          </InputGroup>
          <InputGroup>
            <InputGroupText
              style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}
              className={"input-text"}
            >
              Senha
            </InputGroupText>
            <Input
              onChange={handleConfirmPasswordChange}
              style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}
              className="input"
              placeholder="Confirmar Senha"
            />
          </InputGroup>
        </Form>
        <InputGroup>
          <InputGroupText
            style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}
            className={"input-text"}
          >
            Username
          </InputGroupText>
          <Input
            onChange={handleUsernameChange}
            style={{ backgroundColor: "rgb(29, 29, 29)", color: "crimson" }}
            className="input"
            placeholder="Nome de usuário"
          />
        </InputGroup>

        <div className="form-footer" style={formFooter}>
          <p style={p}>
            Deseja se cadastrar como um{" "}
            <a
              href=""
              onClick={() => {
                navigate("/registerAdmin");
              }}
            >
              Administrador?
            </a>
          </p>
        </div>

        <Button style={registerButton} onClick={checkPasswords}>
          Registrar-se
        </Button>
      </div>
    </>
  );
};

export default RegisterForm;

import React, { useState } from "react";
import "./LoginForm.css";
import { Button, Input, InputGroup, InputGroupText, Form } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { p, loginButton } from "./LoginForm.styles";

const api = "http://localhost:3001";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function login() {
    axios
      .post(api + "/Authentication/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success == true) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          
          navigate("/books");
          window.location.reload()
        } else {
          alert(
            "Parece que essa conta não existe, por favor verifique se os dados estão corretos."
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="login-form-container">
        <h1>Login</h1>

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
        </Form>

        <div className="form-footer">
          <p style={p}>
            Não tem uma conta? crie uma{" "}
            <a
              href=""
              onClick={() => {
                navigate("/register");
              }}
            >
              aqui
            </a>
          </p>
        </div>

        <div className="login-button-container">
          <Button style={loginButton} onClick={login}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

import React, { useEffect, useState } from "react";
import "./Header.css";

import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { buttonContainer, buttonMenu, headerLogo } from "./Header.styles";

import verifyAdmin from "../../Functions/verifyAdmin";

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAdmin(verifyAdmin());
      setIsLogged(true);
    } else {
      setIsAdmin(false);
      setIsLogged(false);
    }
  }, []);

  function handleLogoutClick() {
    localStorage.removeItem("token");
    localStorage.setItem("isLogged", false);
    navigate("/");
    window.location.reload();
    alert("Deslogado com suceso.");
  }

  function handleReservadosClick() {
    navigate("/reserved");
  }
  function handleUsuariosClick() {
    navigate("/users");
  }
  function handleLivrosClick() {
    navigate("/books");
  }

  if (isLogged) {
    return (
      <>
        <div className="navbar" style={{ padding: "0px" }}>
          <p style={headerLogo}>BookFlix</p>

          <div className="menu-container" style={buttonContainer}>
            {isAdmin ? (
              <>
                <Button style={buttonMenu} onClick={handleReservadosClick}>
                  Reservados
                </Button>
                <Button style={buttonMenu} onClick={handleUsuariosClick}>
                  Usuários
                </Button>
              </>
            ) : (
              <></>
            )}

            <Button style={buttonMenu} onClick={handleLivrosClick}>
              Livros
            </Button>

            <Button onClick={handleLogoutClick} style={buttonMenu}>
              Logout
            </Button>
          </div>
        </div>
      </>
    );
  } else if (isLogged == false) {
    return (
      <>
        <div className="navbar" style={{ padding: "0px" }}>
          <p style={headerLogo}>BookFlix</p>

          <div className="menu-container" style={buttonContainer}>
            {isAdmin ? (
              <>
                <Button style={buttonMenu} onClick={handleReservadosClick}>
                  Reservados
                </Button>
                <Button style={buttonMenu} onClick={handleUsuariosClick}>
                  Usuários
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default Header;

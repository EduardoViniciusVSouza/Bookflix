import React, { useState, useEffect } from "react";
import axios from "axios";

import jwt_decode from "jwt-decode";

import { p, container } from "./UsersList.styles";

import UserCard from "../UserCard/UserCard";

const api = "http://localhost:3001/Profiles";

const UsersList = () => {
  const [profiles, setProfiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(api);
      setProfiles(data);
  
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={container}>
        <p style={p}>Esses são nossos usuários</p>
      </div>

      {profiles.map((profile) => (
        <UserCard profile={profile} />
      ))}
    </>
  );
};

export default UsersList;

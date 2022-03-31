import React, {useState} from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import ModalEditProfile from "../ModalEditProfile/ModalEditProfile";

import styles from "./UserCard.styles";

const UserCard = ({ profile }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Card style={styles.card}>
        <CardBody>
          <CardTitle tag="h4" style={{ color: "white" }}>
            {profile.name}
          </CardTitle>

          <img
            style={styles.profileImg}
            src="https://th.bing.com/th/id/OIP.EaRv5KvR7qJouGl6uwirvAHaFN?pid=ImgDet&rs=1"
            alt=""
          />
          <CardText tag="h6" style={{ color: "whitesmoke" }}>
            ID: {profile.profileId}
          </CardText>

          <Button
            onClick={() => {
              setModalOpen(!modalOpen)
            }}
          >
            Alterar
          </Button>
          <ModalEditProfile modalOpen={modalOpen} setModalOpen={setModalOpen} profile={profile} />
        </CardBody>
      </Card>
    </>
  );
};

export default UserCard;

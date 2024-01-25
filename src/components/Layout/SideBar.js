import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import ComposeEmail from "../Mail/Compose";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [showModal, setShowModal] = useState(false);
  const reciveMail = useSelector((state) => state.mail.reciveMails);

  let totalUnreadMessage = "";
  reciveMail.forEach((email) => {
    if (!email.isRead) {
      totalUnreadMessage++;
    }
  });
  const showComposeHandel = () => {
    setShowModal(true);
  };

  const closeComposeHandel = () => {
    setShowModal(false);
  };
  return (
    <Stack
      direction="vertical"
      style={{
        backgroundColor: "rgb(247, 247,247)",
        width: "180px",
        marginTop: "-16px",
        height: "625px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Button
          variant="secondary"
          style={{ marginBottom: "0.5rem", fontSize: "20px", width: "140px", marginTop: "10px" }}
          onClick={showComposeHandel}
        >
          Compose
        </Button>
        <Modal show={showModal} size="xl" onHide={closeComposeHandel}>
          <Modal.Header closeButton style={{ fontSize: "xx-small" }} />
          <Modal.Body>
            <ComposeEmail onClose={closeComposeHandel} />
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Link to="/inbox">
          <Button
            variant="light"
            style={{ fontSize: "20px", fontWeight: "600", width: "125px" }}
          >
            Inbox
            <span style={{ marginLeft: "10px" }}>{totalUnreadMessage}</span>
          </Button>
        </Link>
      </div>
      <div>
        <Link to="/sent">
          <Button
            variant="light"
            style={{ fontSize: "20px", fontWeight: "600", width: "125px" }}
          >
            Sent
          </Button>
        </Link>
      </div>
    </Stack>
  );
};

export default SideBar;

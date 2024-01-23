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
    <Stack direction="vertical">
      <div>
        <Button
          variant="secondary"
          style={{ marginBottom: "0.5rem", fontSize: "20px", width: "140px" }}
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
        <Button
          variant="light"
          style={{ fontSize: "20px", fontWeight: "600", width: "125px" }}
        >
          Sent
        </Button>
      </div>
    </Stack>
  );
};

export default SideBar;

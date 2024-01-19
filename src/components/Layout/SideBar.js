import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import ComposeEmail from "../Mail/Compose";

const SideBar = () => {
  const [showModal, setShowModal] = useState(false);
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
        <Button
          variant="light"
          style={{ fontSize: "20px", fontWeight: "600", width: "125px" }}
        >
          Inbox
        </Button>
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

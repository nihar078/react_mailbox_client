import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import "./Compose.css";
import { receiveMailHandler, sentMailHandeler } from "../../store/mailActions";

const ComposeEmail = (props) => {
  const dispatch = useDispatch();
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const userEmail = useSelector((state) => state.auth.email);
  const fromEmail = userEmail ? userEmail.replace(/[@.]/g, "") : "";

  const toHandler = (event) => {
    setToEmail(event.target.value);
  };
  const subjectHandler = (event) => {
    setSubject(event.target.value);
  };

  const mailSubmitHandler = async (event) => {
    event.preventDefault();
    const recevierEmail = toEmail.replace(/[@.]/g, "");
    const emailObj = {
      to: toEmail,
      from: userEmail,
      subject: subject,
      message: editorState.getCurrentContent().getPlainText(),
      time: new Date().toISOString(),
    };
    console.log(emailObj);
    // Save the email to the sender's "sent" folder

    // const response = await fetch(
    //   `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/sent.json`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(emailObj),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    // } else {
    //   const data = await response.json();
    //   console.log(data.error.message);
    // }

    //  using redux and dispatch

    await dispatch(sentMailHandeler(fromEmail, emailObj));

    // Save the email to the receiver's "inbox" folder
    // await fetch(
    //   `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${recevierEmail}/inbox.json`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(emailObj),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    await dispatch(receiveMailHandler(recevierEmail, emailObj));
  };
  return (
    <Container>
      <Form onSubmit={mailSubmitHandler}>
        <div className="format">
          <label>To</label>
          <input
            type="text"
            placeholder="Recipient"
            value={toEmail}
            onChange={toHandler}
          />
        </div>
        <hr />
        <div className="format">
          <input
            type="text"
            placeholder="subject"
            value={subject}
            onChange={subjectHandler}
          />
        </div>
        <hr />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Editor
            wrapperClassName="editor-wrapper"
            editorClassName="gmail-editor"
            editorState={editorState}
            onEditorStateChange={(newEditorState) =>
              setEditorState(newEditorState)
            }
          />
        </div>
        <Button type="submit" onClick={props.onClose}>
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default ComposeEmail;

import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./AuthForm.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const emailHandeler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (confirmPassword !== password && confirmPassword.length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2M46OtUxDNgbXwOpbNFsRw6T34LZMYSM`,
      {
        method: "POSt",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("User has successfully signed up", data);
      alert("successfuly signup.. try to login");
    } else {
      const data = await response.json();
      alert(data.error.message);
    }
    const user = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    // console.log(user);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <Container>
      <Form className="auth" onSubmit={formSubmitHandler}>
        <h2>SignUp</h2>
        <Form.Group className="control" controlId="formGroupEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={emailHandeler}
          />
        </Form.Group>
        <Form.Group className="control" controlId="formGroupPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={passwordHandler}
          />
        </Form.Group>
        <Form.Group className="control" controlId="formGroupConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            required
            value={confirmPassword}
            onChange={confirmPasswordHandler}
          />
        </Form.Group>
        {showAlert && (
          <Alert variant="danger">
            {" "}
            Confirm password doesn't match, please try again!
          </Alert>
        )}
        <div className="actions">
          <Button type="submit" variant="primary">
            SignUp
          </Button>
        </div>
      </Form>
      <div className="actions">
        <Button variant="light" className="toggle">
          {" "}
          Have an account?Login
        </Button>
      </div>
    </Container>
  );
};

export default AuthForm;

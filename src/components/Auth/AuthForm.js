import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import "./AuthForm.css";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailHandeler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!isLogin) {
      if (confirmPassword !== password && confirmPassword.length > 0) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2M46OtUxDNgbXwOpbNFsRw6T34LZMYSM`,
        {
          method: "POST",
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
    } else {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2M46OtUxDNgbXwOpbNFsRw6T34LZMYSM`,
        {
          method: "POST",
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
        console.log("succesfully login", data);
        dispatch(authActions.login({token: data.idToken, email: email}))
        navigate("/home")
      } else {
        const data = await response.json();
        alert(data.error.message);
      }
    }
    // const user = {
    //   email: email,
    //   password: password,
    //   confirmPassword: confirmPassword,
    // };
    // console.log(user);
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");
  };
  return (
    <Container>
      <Form className="auth" onSubmit={formSubmitHandler}>
        <h2>{isLogin ? "Login" : "SignUp"}</h2>
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
          <div
            style={{
              display: "flex",
              position: "relative",
              alignItems: "center",
            }}
          >
            <Form.Control
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={passwordHandler}
            />
            <Button
              variant="link"
              style={{ position: "absolute", right: "1px" }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </Form.Group>
        {!isLogin && (
          <Form.Group className="control" controlId="formGroupConfirmPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <div
              style={{
                display: "flex",
                position: "relative",
                alignItems: "center",
              }}
            >
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={confirmPasswordHandler}
              />
              <Button
                variant="link"
                onClick={toggleConfirmPasswordVisibility}
                style={{ position: "absolute", right: "1px" }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
          </Form.Group>
        )}
        {showAlert && (
          <Alert variant="danger">
            {" "}
            Confirm password doesn't match, please try again!
          </Alert>
        )}
        <div className="actions">
          <Button type="submit" variant="primary">
            {isLogin ? "Login" : "SignUp"}
          </Button>
        </div>
      </Form>
      <div className="actions">
        <Button
          variant="light"
          className="toggle"
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Have an account?SignUp" : "Have an account?Login"}
        </Button>
      </div>
    </Container>
  );
};

export default AuthForm;

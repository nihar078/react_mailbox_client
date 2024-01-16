import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/authSlice";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const authRdx = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <div>
      <header>
        <Navbar bg="light" style={{ justifyContent: "space-between" }}>
          <Nav>
            <NavLink
              to="/home"
              className="mx-3 px-2"
              style={{ textDecoration: "none" }}
            >
              Home
            </NavLink>
            <NavLink
              to="/auth"
              className="mx-3 px-2"
              style={{ textDecoration: "none" }}
            >
              {!authRdx.isLoggedIn && "Login"}
            </NavLink>
          </Nav>
          {authRdx.isLoggedIn && (
            <Button style={{ marginRight: "3px" }} onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Navbar>
      </header>
    </div>
  );
};

export default MainNavigation;

import React, { Fragment } from "react";
import AuthForm from "./components/Auth/AuthForm";
import Header from "./components/Layout/Header";
import MainNavigation from "./components/Layout/MainNavigation";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ComposeEmail from "./components/Mail/Compose";
import Inbox from "./components/Mail/Inbox";
import ShowMail from "./components/Mail/ShowMail";
import SentBox from "./components/Mail/SentBox";
import SentShowMail from "./components/Mail/SentMail/SentShowMail";

function App() {
  const authRdx = useSelector((state) => state.auth);
  // console.log(authRdx);
  return (
    <Fragment>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <>
              {authRdx.isLoggedIn && (
                <>
                  <Header />
                  <Inbox />
                </>
              )}
              {!authRdx.isLoggedIn && <Navigate to="/auth" />}
            </>
          }
        />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/compose" element={<ComposeEmail />} />
        {authRdx.isLoggedIn && (
          <Route path="/inbox" element={<Navigate to="/home" />} />
        )}
        <Route
          path="/email/:id"
          element={
            <>
              <Header />
              <ShowMail />
            </>
          }
        />
        <Route
          path="/sent"
          element={
            <>
              <Header />
              <SentBox />
            </>
          }
        />
        <Route
          path="/sentmail/:id"
          element={
            <>
              <Header />
              <SentShowMail />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Header /> */}
      {/* <AuthForm /> */}
    </Fragment>
  );
}

export default App;

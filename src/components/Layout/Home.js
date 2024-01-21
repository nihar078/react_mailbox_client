import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const email = useSelector((state) => state.auth.email);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", left: "1px" }}>
        <h1>Welcome to your mail box!!!</h1>
        <p style={{ marginRight: "2px", marginLeft: "auto" }}>{email}</p>
      </div>
      <hr />
    </div>
  );
};

export default Home;

import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ShowMail.css";

const ShowMail = () => {
  const param = useParams();
  // console.log(param)
  console.log(param.id);
  const location = useLocation();
  console.log(location);
  console.log(location.state.email);

  const email = {
    id: param.id,
    subject: location.state.email.subject,
    from: location.state.email.title,
    to: location.state.email.to,
    message: location.state.email.message,
    time: location.state.email.time,
  };

  // Convert the timestamp to a Date object
  const dateObject = new Date(email.time);

  // Format the time in the desired format
  const formattedTime = dateObject.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="showMail">
      <h2>{email.subject}</h2>
      <div className="mainMessagebg">
        <div className="messageContact">
          <span>
            <p>From:{email.from}</p>
            <p>To:{email.to}</p>
          </span>
          <p>{formattedTime}</p>
        </div>
        <p
          style={{
            marginLeft: "19px",
            padding: "5px",
            whiteSpace: "pre-line",
            fontSize: "large",
          }}
        >
          {email.message}
        </p>
      </div>
    </div>
  );
};

export default ShowMail;

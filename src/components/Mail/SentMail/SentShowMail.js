import React from "react";
import "./SentShowMail.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteSentMailHandler } from "../../../store/mailActions";

const SentShowMail = () => {
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate()
  const userEmail = useSelector((state) => state.auth.email)
  const sentEmail = userEmail ? userEmail.replace(/[@.]/g, "") : ""
  const dispatch = useDispatch()
  //   console.log(param.id);
  // console.log(location)
  const email = {
    id: param.id,
    from: location.state.email.from,
    to: location.state.email.to,
    subject: location.state.email.subject,
    message: location.state.email.message,
    time: location.state.email.time,
  };
  //   console.log(email);

  const dateObject = new Date(email.time);

  const formattedTime = dateObject.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const remvHandler = () => {
    dispatch(deleteSentMailHandler(sentEmail, param.id))
    navigate("/sent")
  }

  return (
    <div className="sentShwMail">
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button variant="link" className="sentBackNav" onClick={() => navigate("/sent")}>
          <MdOutlineKeyboardBackspace />
          {"Back"}
        </Button>
        <Button variant="link" className="sentDelNav" onClick={remvHandler}>
          <MdDelete style={{ fontSize: "22px" }} />
          {"Delete"}
        </Button>
      </div>
      <hr />
      <h2>{email.subject}</h2>
      <div className="sentMainMsgBg">
        <div className="sentMsgCnt">
          <span>
            <p>From: {email.from}</p>
            <p>To: {email.to}</p>
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

export default SentShowMail;

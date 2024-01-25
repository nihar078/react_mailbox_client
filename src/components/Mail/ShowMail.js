import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import "./ShowMail.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMailHandler } from "../../store/mailActions";

const ShowMail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email)
  const rcvEmail = userEmail ? userEmail.replace(/[@.]/g, "") : ""
  const param = useParams();
  // console.log(param)
//   console.log(param.id);
  const location = useLocation();
//   console.log(location);
//   console.log(location.state.email);

  const email = {
    id: param.id,
    subject: location.state.email.subject,
    from: location.state.email.title,
    to: location.state.email.to,
    message: location.state.email.message,
    time: location.state.email.time,
  };

  const removeHandler = () =>{
    dispatch(deleteMailHandler(rcvEmail, param.id))
    navigate("/home")
  }

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="link"
          className="backNavigation"
          onClick={() => navigate("/inbox")}
        >
          <MdOutlineKeyboardBackspace />
          {"Back"}
        </Button>
        <Button variant="link" className="delNavigation" onClick={removeHandler}>
          <MdDelete style={{fontSize: "22px"}}/>
        </Button>
      </div>
      <hr />
      <h2 style={{marginLeft: "10px"}}>{email.subject}</h2>
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

import React from "react";
import { GrCheckbox } from "react-icons/gr";
import { CiStar } from "react-icons/ci";
import "./SentEmailBox.css";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteSentMailHandler } from "../../../store/mailActions";

const SentEmailBox = (props) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email)
  const sentEmail = userEmail ? userEmail.replace(/[@.]/g, "") : ""
  const time = props.time;
  const dateObject = new Date(time);

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedTime = dateObject.toLocaleTimeString("en-US", options);
  const removeSentHandler = () => {
    dispatch(deleteSentMailHandler(sentEmail, props.id));
  };

  return (
    <div style={{ position: "relative", alignItems: "center" }}>
      <Link
        to={`/sentmail/${props.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
        state={{ email: props }}
      >
        <div className="emailRow">
          <div className="emailRow_options">
            <GrCheckbox style={{ marginLeft: "2px", marginRight: "6px" }} />
            <CiStar />
          </div>
          <p>{props.to}</p>
          <div className="emilRow_message">
            <span>{props.subject}</span>
            <p dangerouslySetInnerHTML={{ __html: props.message }}></p>
          </div>
          <p style={{ position: "absolute", right: "0px" }} className="time">
            {formattedTime}
          </p>
          <Link
            style={{
              color: "red",
              fontSize: "30px",
              position: "absolute",
              right: "1px",
            }}
            className="deleteLink"
            onClick={removeSentHandler}
          >
            {" "}
            <MdDelete />
          </Link>
        </div>
      </Link>
    </div>
  );
};
export default SentEmailBox;

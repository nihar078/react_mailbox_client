import React from "react";
import "./EmailBox.css";
import { GrCheckbox } from "react-icons/gr";
import { CiStar } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteMailHandler, markAsReadHandlerBE } from "../../store/mailActions";

const EmailBox = (props) => {
  //   console.log(time);
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  const fromEmail = userEmail ? userEmail.replace(/[@.]/g, "") : "";

  const time = props.time;
  const dateObject = new Date(time);

  const options = {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: true, // Use 12-hour format
  };

  const formattedTime = dateObject.toLocaleTimeString("en-US", options);
  //   console.log(formattedTime);

  const markAsReadHandler = () => {
    const updateemail = {
      id: props.id,
      from: props.title,
      to: props.to,
      subject: props.subject,
      message: props.message,
      time: props.time,
      isRead: true,
    };
    dispatch(markAsReadHandlerBE(fromEmail, updateemail, props.id));
  };

  const deleteHandler = () =>{
    dispatch(deleteMailHandler(fromEmail, props.id))
  }
  return (
    <div>
      <Link
        to={`/email/${props.id}`}
        state={{ email: props }}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={markAsReadHandler}
      >
        <div className="emailRow">
          <div className="emailRow_options">
            <GrCheckbox style={{ marginLeft: "2px", marginRight: "6px" }} />
            <CiStar />
          </div>
          <div className="emailRead">{!props.isRead && <FaCircle />}</div>
          {!props.isRead ? <h5>{props.title}</h5> : <p>{props.title}</p>}
          <div className="emilRow_message">
            {!props.isRead ? (
              <h6>{props.subject}</h6>
            ) : (
              <span>{props.subject}</span>
            )}
            {/* <p>fiok</p> */}
            <p dangerouslySetInnerHTML={{ __html: props.message }}></p>
          </div>
          <p style={{ position: "absolute", right: "0px" }} className="time">{formattedTime}</p>
          <Link
            style={{
              color: "red",
              position: "absolute",
              right: "1px",
              fontSize: "30px",
            }}
            className="deleteLink"
            onClick={deleteHandler}
          >
            <MdDelete />
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default EmailBox;

import React from "react";
import "./EmailBox.css";
import { GrCheckbox } from "react-icons/gr";
import { CiStar } from "react-icons/ci";

const EmailBox = (props) => {
  const time = props.time;
  //   console.log(time);

  const dateObject = new Date(time);

  const options = {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: true, // Use 12-hour format
  };

  const formattedTime = dateObject.toLocaleTimeString("en-US", options);
  //   console.log(formattedTime);

  return (
    <div className="emailRow">
      <div className="emailRow_options">
        <GrCheckbox style={{marginLeft: "2px", marginRight: "6px"}}/>
        <CiStar />
      </div>
      <h5>{props.title}</h5>
      <div className="emilRow_message">
        <h6>{props.subject}</h6>
        {/* <p>fiok</p> */}
        <p dangerouslySetInnerHTML={{ __html: props.message }}></p>
      </div>
      <p style={{position:"absolute" ,right: "0px"}}>{formattedTime}</p>
    </div>
  );
};

export default EmailBox;
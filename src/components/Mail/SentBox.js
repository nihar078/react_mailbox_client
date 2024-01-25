import React, { useEffect } from "react";
import "./SentBox.css";
import { Stack } from "react-bootstrap";
import SentEmailBox from "./SentMail/SentEmailBox";
import { useDispatch, useSelector } from "react-redux";
import { sentboxHandler } from "../../store/mailActions";

const SentBox = () => {
    const dispatch = useDispatch()
  const sentMails = useSelector((state) => state.mail.sentMails);
  const userEmail = useSelector((state) => state.auth.email)
  const fromEmail = userEmail ? userEmail.replace(/[@.]/g, "") : "" 
  // console.log(sentMails)
  useEffect(()=>{
    const fetchSentEmails = () => {
        dispatch(sentboxHandler(fromEmail))
    }
    fetchSentEmails()
  },[dispatch, fromEmail])

  const reversedEmails = [...sentMails].reverse()
  return (
    <div className="sent">
      <h1>SentBox</h1>
      <Stack>
        <span>
          {reversedEmails.map((email) => (
            <SentEmailBox
              key={email.id}
              id={email.id}
              to={email.to}
              from={email.from}
              subject={email.subject}
              message={email.message}
              time= {email.time}
            />
          ))}
          {/* <SentEmailBox /> */}
        </span>
      </Stack>
    </div>
  );
};

export default SentBox;

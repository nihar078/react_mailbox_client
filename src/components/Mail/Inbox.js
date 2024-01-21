import React, { useEffect, useState } from "react";
import "./Inbox.css";
import { useSelector } from "react-redux";
import { Stack } from "react-bootstrap";
import EmailBox from "./EmailBox";

const Inbox = () => {
  const [receivedEmails, setReceivedEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.email);

  const fromEmail = userEmail ? userEmail.replace(/[@.]/g, "") : "";

  useEffect(() => {
    const fetchReceivedEmails = async () => {
      const response = await fetch(
        `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/inbox.json`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const emails = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setReceivedEmails(emails)
        // console.log(emails)
      } else {
        console.error("Failed to fetch received emails");
      }
    };
    fetchReceivedEmails();
  }, [fromEmail]);
  return (
    <div className="inbox">
      <h1>Inbox</h1>
      <Stack>
        <span>
          {receivedEmails.map((email) => (
            <EmailBox 
            key={email.id}
            title={email.from}
            subject={email.subject}
            message={email.message}
            time={email.time}
            />
          ))}
        </span>
      </Stack>
    </div>
  );
};

export default Inbox;

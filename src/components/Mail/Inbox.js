import React, { useEffect } from "react";
import "./Inbox.css";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "react-bootstrap";
import EmailBox from "./EmailBox";
import { inboxHandler } from "../../store/mailActions";

const Inbox = () => {
  // const [receivedEmails, setReceivedEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.email);

  const fromEmail = userEmail ? userEmail.replace(/[@.]/g, "") : "";
  const receivedEmails = useSelector((state) => state.mail.reciveMails);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchReceivedEmails = async () => {

      //   const response = await fetch(
      //     `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/inbox.json`
      //   );
      //   if (response.ok) {
      //     const data = await response.json();
      //     console.log(data);
      //     const emails = Object.keys(data).map((key) => ({
      //       id: key,
      //       ...data[key],
      //     }));
      //     setReceivedEmails(emails)
      //     // console.log(emails)
      //   } else {
      //     console.error("Failed to fetch received emails");
      //   }

      await dispatch(inboxHandler(fromEmail));
    };
    fetchReceivedEmails()
    const interval = setInterval(() => {
      // fetchReceivedEmails();
    }, 2000)
    return () => clearInterval(interval)
  }, [dispatch, fromEmail]);

  // console.log(receivedEmails)
  const reversedEmails = [...receivedEmails].reverse();
  return (
    <div className="inbox">
      <h1>Inbox</h1>
      <Stack>
        <span>
          {reversedEmails.map((email) => (
            <EmailBox
              key={email.id}
              id={email.id}
              title={email.from}
              to={email.to}
              subject={email.subject}
              message={email.message}
              time={email.time}
              isRead={email.isRead}
            />
          ))}
        </span>
      </Stack>
    </div>
  );
};

export default Inbox;

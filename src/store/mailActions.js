import { mailActions } from "./mailSlice";

export const sentMailHandeler = (fromEmail, emailObj) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/sent.json`,
      {
        method: "POST",
        body: JSON.stringify(emailObj),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const data = await response.json();
      const createSentMail = { id: data.name, ...emailObj };
      dispatch(mailActions.setSentMail(createSentMail));
    } else {
      const data = await response.json();
      console.error(data.error.message);
    }
  };
};

export const inboxHandler = (fromEmail) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/inbox.json`
    );
    if (response.ok) {
      const data = await response.json();
      //   console.log(data)
      //   const emails = Object.keys(data).map((key) => ({
      //     id: key,
      //     ...data[key],
      //   }));
      //or
      const emails = [];
      for (const key in data) {
        emails.push({
          id: key,
          ...data[key],
        });
      }
      dispatch(mailActions.setInbox(emails));
    } else {
      console.error("Failed to fetch received emails");
    }
  };
};
// Save the email to the receiver's "inbox" folder

export const receiveMailHandler = (recevierEmail, emailObj) => {
  return async (dispatch) => {
    const addExtraEmailObj = { isRead: false, ...emailObj };
    const response = await fetch(
      `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${recevierEmail}/inbox.json`,
      {
        method: "POST",
        body: JSON.stringify(addExtraEmailObj),
        headers: {
          Content_Type: "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      //   console.log(data);
      //   console.log(data.name);
      const createMail = { id: data.name, ...addExtraEmailObj };
      console.log(createMail);
      dispatch(mailActions.setreciveMail(createMail));
    }
  };
};

export const markAsReadHandlerBE = (fromEmail, updated, emailId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/inbox/${emailId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(updated),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const { mail } = getState();
        // console.log(mail)
        const emailIndex = mail.reciveMails.findIndex(
          (email) => email.id === emailId
        );
        if (emailIndex !== -1) {
          dispatch(
            mailActions.markAsReadSuccess({
              id: emailId,
              update: { isRead: true },
            })
          );
        }
      } else {
        throw new Error("Failed to mark email as read");
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteMailHandler = (fromEmail, emailId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/inbox/${emailId}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      dispatch(mailActions.deleteMail(emailId));
      console.log("mail Delete Succesfully from inbox backendserver");
    } else {
      console.error("something went wrong in the delete");
    }
  };
};

export const sentboxHandler = (fromEmail) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/sent.json`
    );

    if (response.ok) {
      const data = await response.json();
      const emailData = [];
      for (const key in data) {
        emailData.push({
          id: key,
          ...data[key],
        });
      }
      dispatch(mailActions.setSentbox(emailData));
    }
  };
};

export const deleteSentMailHandler = (fromEmail, emailId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/sent/${emailId}.json`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      dispatch(mailActions.deleteSentMail(emailId));
      console.log("mail Delete Succesfully from the sent backend server");
    } else {
      console.error("something went wrong in the delete");
    }
  };
};

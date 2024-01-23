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
      dispatch(mailActions.setSentMail(data));
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
    const emails = []
    for (const key in data){
        emails.push({
            id: key,
            ...data[key]
        })
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
    const addExtraEmailObj = {isRead: false, ...emailObj}
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
      console.log(createMail)
      dispatch(mailActions.setreciveMail(createMail));
    }
  };
};

export const markAsReadHandlerBE = (fromEmail, updated, emailId) =>{
  return async (dispatch, getState) =>{
    try {
      const response = await fetch(`https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/inbox/${emailId}.json`, {
        method: "PUT",
        body: JSON.stringify(updated),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(response.ok){
        const mail = getState();
        // console.log(mail)
        const emailIndex = mail.reciveMails.findIndex((email) => email.id === emailId)
        if(emailIndex !== -1){
          dispatch(mailActions.markAsReadSuccess({
            id: emailId,
            update: {isRead: true}
          }))
        }
      }
    } catch (error) {
      
    }
  }
}

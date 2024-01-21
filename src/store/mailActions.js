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
    }
    else{
        const data = await response.json()
        console.error(data.error.message)
    }
  }
};

export const receiveMailHandler = (fromEmail) =>{
    return async (dispatch) =>{
        const response = await fetch(`https://react-pra-jan-emailbox-default-rtdb.firebaseio.com/${fromEmail}/inbox.json`)
        if(response.ok){
            const data = await response.json()
            const emails = Object.keys(data).map((key) => ({
                id: key,
                ...data[key]
            }))
            dispatch(mailActions.setInbox(emails))
        }
        else{
            console.error("Failed to fetch received emails")
        }
    }
}

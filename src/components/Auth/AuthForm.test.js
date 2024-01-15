import { render, screen } from "@testing-library/react";
import AuthForm from "./AuthForm";
import userEvent from "@testing-library/user-event";

describe("Auth Form Component", () => {
  test("render signup heading", () => {
    render(<AuthForm />);

    const signupElements = screen.getAllByText(/signup/i)
    const signupElement = signupElements[0]

    expect(signupElement).toBeInTheDocument();
  });

  test("render email label", () => {
    render(<AuthForm />)

    // const emailLabelElement = screen.getByText("Email:")
    const emailLabelElement = screen.getByText("Email", { exact: false }); // 2 lines are correct
    expect(emailLabelElement).toBeInTheDocument()
  })

  test("render password label", ()=> {
    render(<AuthForm />)

    const passwordLabelElement = screen.getByText("Password:")

    expect(passwordLabelElement).toBeInTheDocument()
  })

  test("render confirm password label", () => {
    render(<AuthForm />);

    const confirmPasswordLabelElement = screen.getByText("Confirm Password:");
    expect(confirmPasswordLabelElement).toBeInTheDocument();
  });

  test("render signup button", ()=> {
    render(<AuthForm />)

    const buttonElements = screen.getAllByRole("button")
    const buttonElement = buttonElements[0]
    userEvent.click(buttonElement)

    const signupButtonElements = screen.getAllByText(/signup/i)
    const signupButtonElement = signupButtonElements[1]
    expect(signupButtonElement).toBeInTheDocument()
    
  })
});

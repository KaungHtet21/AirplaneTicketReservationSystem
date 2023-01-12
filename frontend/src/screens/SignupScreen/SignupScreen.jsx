import React, { useState } from "react";
// import google_icon from "../../assets/google_icon.png";
import "./SignupScreen.css";

export default function SignupScreen() {
  const [title, setTitle] = useState("Mr");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSignupOnClick = (e) => {
    e.preventDefault();
    if (
      name.length == 0 ||
      surname.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0
    ) {
      setError(true);
    } else {
      signUp();
    }
    console.log(name, surname, email, password, confirmPassword);
  };

  async function signUp() {
    let item = { name, surname, title, email, password };
    console.warn(item);

    let result = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    console.warn("user-info", result);
  }

  return (
    <div className="signup">
      <div className="signup_container">
        <h2>Sign up</h2>

        {error ? (
          <span style={{ color: "red", fontSize: "14px" }}>
            *All fields are required.
          </span>
        ) : (
          ""
        )}

        <div className="signup_title">
          <span>Title</span>
          <select value={title} onChange={(e) => setTitle(e.target.value)}>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
          </select>
        </div>

        <div className="signup_username">
          <div className="signup_name">
            <span>Name</span>
            <input
              type="text"
              placeholder="John"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="signup_surname">
            <span>Surname</span>
            <input
              type="text"
              placeholder="Wick"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>

        <div className="signup_email">
          <span>Email</span>
          {error && regex.test(email) == false ? (
            <span style={{ color: "red", fontSize: "14px" }}>
              *Email validation error
            </span>
          ) : (
            ""
          )}
          <input
            type="text"
            placeholder="example@gmail.com"
            style={{ width: "60%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="signup_password">
          <span>Password</span>
          {error && password.length < 8 ? (
            <span style={{ color: "red", fontSize: "14px" }}>
              *At least 8 characters are required
            </span>
          ) : (
            ""
          )}
          <input
            type="password"
            style={{ width: "60%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span>Confirm Password</span>
          {error && password != confirmPassword ? (
            <span style={{ color: "red", fontSize: "14px" }}>
              *Password not matched
            </span>
          ) : (
            ""
          )}
          <input
            type="password"
            style={{ width: "60%" }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button onClick={handleSignupOnClick}>Sign up</button>
        {/* <div className="signup_button_div">
          
          <button>
            <img
              style={{ width: "16px", height: "16px" }}
              src={google_icon}
              alt=""
            />
            <span> Sign in with Google</span>
          </button>
        </div> */}
      </div>
    </div>
  );
}

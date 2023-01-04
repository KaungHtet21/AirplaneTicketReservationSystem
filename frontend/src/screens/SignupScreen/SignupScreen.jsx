import React, { useState } from "react";
import google_icon from "../../assets/google_icon.png";
import "./SignupScreen.css";

export default function SignupScreen() {
  const [title, setTitle] = useState();
  return (
    <div className="signup">
      <div className="signup_container">
        <h2>Sign up</h2>
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
            <input type="text" placeholder="John" />
          </div>
          <div className="signup_surname">
            <span>Surname</span>
            <input type="text" placeholder="Wick" />
          </div>
        </div>
        <div className="signup_email">
          <span>Email</span>
          <input
            type="text"
            placeholder="example@gmail.com"
            style={{ width: "60%" }}
          />
        </div>
        <div className="signup_password">
          <span>Password</span>
          <input
            type="password"
            style={{ width: "60%" }}
          />
          <span>Confirm Password</span>
          <input
            type="password"
            style={{ width: "60%" }}
          />
        </div>
        <div className="signup_button_div">
          <button>Login</button>
          <button>
            <img
              style={{ width: "16px", height: "16px" }}
              src={google_icon}
              alt=""
            />
            <span> Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import paper_plane from "../../assets/paper_plane.gif";
import google_icon from "../../assets/google_icon.png";
import { useState } from "react";

export default function LoginScreen() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLoginOnClick = () => {
    console.log(email + ' ' + password);
  }

  return (
    <div className="login">
      <div className="login_container">
        <img className="login_image" src={paper_plane} alt="" />
        <form className="auth_info_wrapper" action="" method="post">
          <h1>Login</h1>
          <div className="auth_input_field">
            <span>Email</span>
            <input
              type="text"
              className="input"
              placeholder="Enter your email address"
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div className="auth_input_field">
            <span>Password</span>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLoginOnClick}>Login</button>
          {/* <button onClick={handleGoogleLogInOnClick}>
            <img
              style={{ width: "16px", height: "16px" }}
              src={google_icon}
              alt=""
            />
            <span> Sign in with Google</span>
          </button> */}
          <div style={{ fontSize: "12px", marginTop: "10px" }}>
            <Link style={{textDecoration: "none"}} to="/signup">
              <span>Sign up</span>
            </Link>
            <span> | </span>
            <span style={{ color: "#065a9e" }}>Forgot Password</span>
          </div>
        </form>
      </div>
    </div>
  );
}

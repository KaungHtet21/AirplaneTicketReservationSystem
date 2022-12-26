import React, { Fragment } from "react";
import "./LoginScreen.css";
import paper_plane from "../../assets/paper_plane.gif";
import google_icon from "../../assets/google_icon.png";

export default function LoginScreen() {
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
            />
          </div>
          <div className="auth_input_field">
            <span>Password</span>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
            />
          </div>
          <button>Login</button>
          <button>
            <img
              style={{ width: "16px", height: "16px" }}
              src={google_icon}
              alt=""
            />
            <span> Google</span>
          </button>
          <div style={{ fontSize: "12px", marginTop: "10px" }}>
            <span>Sign up</span>
            <span> | </span>
            <span style={{ color: "#065a9e" }}>Forgot Password</span>
          </div>
        </form>
      </div>
    </div>
  );
}

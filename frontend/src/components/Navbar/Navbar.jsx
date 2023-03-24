import { Link } from "react-router-dom";
import React, { Component } from "react";
import { MenuItems } from "../Lists/MenuItems";
import "./NavbarStyles.css";
import miit_logo from "../../assets/miit_logo.png";
import kae_logo from "../../assets/kae_profile.jpg"

class Navbar extends Component {
  state = { clicked: false };
  handleClicked = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        {/* <h1 className="navbar-logo">MIIT</h1> */}
        <img style={{width: "80px", height: "80px"}} src={kae_logo} alt="" className="navbar-logo" />
        <div className="menu-icons" onClick={this.handleClicked}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  <i className={item.icon}></i> {item.title}
                </Link>
              </li>
            );
          })}
          <Link to="/login">
            <button className="nav_signin_btn">Sign In</button>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

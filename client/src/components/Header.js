import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import M from "materialize-css";

import Payment from "./Payment";

class Header extends Component {
  componentDidMount() {
    const options = {};
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems, options);
    });
  }
  render() {
    const renderContent = () => {
      switch (this.props.auth) {
        case null:
          return;
        case false:
          return (
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
          );
        default:
          return [
            <li key="1">
              <Payment />
            </li>,
            <li key="3" style={{ margin: "0 10px 0 30px" }}>
              Credits: {this.props.auth.credit}
            </li>,
            <li key="2">
              <a href="/api/logout">Logout</a>
            </li>
          ];
      }
    };
    return (
      <nav>
        <div className="nav-wrapper light-blue lighten-2">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="brand-logo"
            style={{ margin: "0 10px" }}
          >
            Auto-Emaily
          </Link>
          <a href="#" class="sidenav-trigger" data-target="nav-mobile">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">{renderContent()}</ul>
          <ul
            className="sidenav light-blue lighten-3"
            id="nav-mobile"
            style={{ opacity: "0.9", backdropFilter: "blur(2px)" }}
          >
            {renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);

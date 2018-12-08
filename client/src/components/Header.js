import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payment from "./Payment";

class Header extends Component {
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
            <li key= "3" style={{margin: '0 10px'}}>
            Credits: {this.props.auth.credit}
            </li>,
            <li key="2">
              <a href="/api/logout">Logout </a>
            </li>
          ];
      }
    };
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">
            Auto-Emaily
          </Link>
          <ul className="right">{renderContent()}</ul>
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
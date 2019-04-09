import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.svg";
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBurger: false,
      activeSort: false
    };

    this.toggleBurger = this.toggleBurger.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.removeBurger = this.removeBurger.bind(this);
  }

  toggleBurger() {
    this.setState({
      activeBurger: this.state.activeBurger ? false : true
    });
  }

  removeBurger() {
    this.setState({
      activeBurger: false
    });
  }

  toggleSort() {
    this.setState({
      activeSort: !this.state.activeSort
    });
    this.props.addState(!this.state.activeSort);
  }

  render() {
    return (
      <header id="header">
        <div className="header__wrapper">
          <Link
            onClick={this.removeBurger}
            id="logo"
            className={this.state.activeBurger && "active"}
            to="/"
          >
            <img src={logo} alt="" />
          </Link>

          <nav className={this.state.activeBurger && "active"} id="nav">
            <a
              onClick={this.toggleBurger}
              className="icon-close"
              href="javascript:void(0)"
            />
            <ul>
              <li>
                <Link to="/list" onClick={this.toggleBurger}>
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/info" onClick={this.toggleBurger}>
                  Info
                </Link>
              </li>
              <li>
                <Link to="/contacts" onClick={this.toggleBurger}>
                  Contacts us
                </Link>
              </li>
            </ul>
          </nav>
          <a
            onClick={this.toggleSort}
            className={`icon-sort ${this.state.activeSort ? "active" : ""}`}
            href="javascript:void(0)"
          />
          <a
            onClick={this.toggleBurger}
            className="burger"
            href="javascript:void(0)"
          />
        </div>
      </header>
    );
  }
}

export default Header;

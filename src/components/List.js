import React, { Component } from "react";
import { Link, Redirect, BrowserRouter, Route } from "react-router-dom";
import userActions from "../actions/user.actions.js";
import InputMask from "react-input-mask";

import iconRunning from "../assets/images/icon-running.svg";
import loading from "../assets/images/loading.svg";
import imgEmpty from "../assets/images/icon-empty.svg";

const styleLoading = {
  padding: "30px 0",
  textAlign: "center",
  maxWidth: "1250px",
  margin: "0 auto",
  fontSize: "24px"
};

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jogs: null,
      sortFrom: "",
      sortTo: "",
      activeSort: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      activeSort: nextprops.activeSort
    });
  }

  componentDidMount() {
    userActions.getJogs().then(jogs => {
      this.setState({
        jogs: jogs
      });

      let user = JSON.parse(localStorage.getItem("user"));
      user.jogs = jogs;
      localStorage.setItem("user", JSON.stringify(user));
    });
  }

  render() {
    let sortFrom = userActions.parseDate(this.state.sortFrom),
      sortTo = userActions.parseDate(this.state.sortTo),
      activeSort = this.state.activeSort,
      jogs = this.state.jogs,
      filteredJogs = jogs;

    if (sortFrom || sortTo) {
      filteredJogs = filteredJogs.filter(
        jog =>
          (sortFrom == null || jog.date * 1000 >= sortFrom) &&
          (sortTo == null || jog.date * 1000 <= sortTo)
      );
    }
    if (!filteredJogs)
      return (
        <div style={styleLoading}>
          <img src={loading} alt="" />
        </div>
      );
    if (!filteredJogs.length)
      return (
        <div id="content">
          <div className={`list-date ${activeSort ? "active" : ""}`}>
            <label>
              <span>Date from</span>
              <InputMask
                name="sortFrom"
                mask="99.99.9999"
                autoFocus
                onChange={this.handleChange}
                tabIndex="1"
              />
            </label>
            <label>
              <span>Date to</span>
              <InputMask
                name="sortTo"
                mask="99.99.9999"
                onChange={this.handleChange}
                tabIndex="2"
              />
            </label>
          </div>
          <div className="content__container">
            <div className="empty-block">
              <img src={imgEmpty} alt="" />
              <p>Nothing is there</p>
              <Link to="/listform" className="btn-general btn-empty">
                Create your jog first
              </Link>
            </div>
          </div>
        </div>
      );

    return (
      <div id="content">
        <div className={`list-date ${activeSort ? "active" : ""}`}>
          <label>
            <span>Date from</span>
            <InputMask
              name="sortFrom"
              mask="99.99.9999"
              autoFocus
              onChange={this.handleChange}
              tabIndex="1"
            />
          </label>
          <label>
            <span>Date to</span>
            <InputMask
              name="sortTo"
              mask="99.99.9999"
              onChange={this.handleChange}
              tabIndex="2"
            />
          </label>
        </div>
        <div class="content__container">
          <div className="list-container">
            {filteredJogs
              .slice(filteredJogs.length - 10, filteredJogs.length)
              .map(jog => {
                const date = userActions.parseDate(jog.date);
                return (
                  <div className="list-block">
                    <div className="list-block__img">
                      <img src={iconRunning} alt="" />
                    </div>
                    <div className="list-block__content">
                      <p className="list-block__publish">{date}</p>
                      <p className="list-block__item list-block__speed">
                        <strong>Speed:</strong>
                        {Math.round(Number(jog.distance) / Number(jog.time))}
                      </p>
                      <p className="list-block__item list-block__distance">
                        <strong>Distance:</strong>
                        {jog.distance} km
                      </p>
                      <p className="list-block__item list-block__time">
                        <strong>Time:</strong>
                        {jog.time} min
                      </p>
                      <Link className="icon-edit" to={"/listform/" + jog.id} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <Link to="/listform" className="icon-addList" />
      </div>
    );
  }
}

export default List;

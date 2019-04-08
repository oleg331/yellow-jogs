import React, { Component } from "react";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

import userActions from "../actions/user.actions.js";

class ListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      user_id: "",
      distance: "",
      time: "",
      date: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.addJog = this.addJog.bind(this);
    this.editJog = this.editJog.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      let user = JSON.parse(localStorage.getItem("user"));
      let jog = user.jogs.find(jog => jog.id == this.props.match.params.id);

      if (jog) {
        this.setState({
          id: this.props.match.params.id,
          user_id: jog.user_id,
          distance: jog.distance,
          time: jog.time,
          date: userActions.parseDate(jog.date)
        });
      }
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addJog(e) {
    e.preventDefault();

    let jog = {
      distance: parseFloat(this.state.distance),
      time: parseInt(this.state.time),
      date: this.state.date
    };

    userActions.addJog(jog).then(() => {
      this.goBack(e);
    });
  }

  editJog(e) {
    e.preventDefault();

    let jog = {
      jog_id: parseInt(this.state.id),
      user_id: this.state.user_id.toString(),
      distance: parseInt(this.state.distance),
      time: parseInt(this.state.time),
      date: this.state.date
    };

    userActions.editJog(jog).then(() => {
      this.goBack(e);
    });
  }

  goBack(event) {
    event.preventDefault();
    this.props.history.goBack();
  }

  render() {
    return (
      <div id="content">
        <div class="content__container">
          <div className="box__container">
            <form action="#" method="post" className="box-signIn form-list">
              <label>
                <span>Distance</span>
                <input
                  type="text"
                  name="distance"
                  value={this.state.distance}
                  onChange={this.handleChange}
                  tabIndex="1"
                  autoFocus
                />
              </label>
              <label>
                <span>Time</span>
                <input
                  type="text"
                  name="time"
                  value={this.state.time}
                  onChange={this.handleChange}
                  tabIndex="2"
                />
              </label>
              <label>
                <span>Date</span>
                <InputMask
                  name="date"
                  mask="99.99.9999"
                  value={this.state.date}
                  onChange={this.handleChange}
                  tabIndex="3"
                />
              </label>
              <button onClick={this.goBack} className="icon-close" />
              <button
                onClick={
                  this.props.match.params.id ? this.editJog : this.addJog
                }
                className="btn-general"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ListForm;

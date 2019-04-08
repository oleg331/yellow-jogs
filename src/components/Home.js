import React, { Component } from "react";

import userActions from "../actions/user.actions.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.goList = this.goList.bind(this);
  }

  goList(event) {
    this.props.history.push("/list");
  }

  render() {
    return (
      <div id="content">
        <div class="content__container">
          <div className="box__container">
            <div className="box-signIn">
              <span className="icon-letMeIn" />
              <button
                onClick={() => {
                  userActions.login().then(this.goList);
                }}
                className="btn-general"
              >
                Let me in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

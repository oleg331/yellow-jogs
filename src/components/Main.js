import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import userActions from "../actions/user.actions.js";

import Home from "./Home";
import Info from "./Info";
import Contacts from "./Contacts";
import List from "./List";
import ListForm from "./ListForm";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSort: false
    };
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      activeSort: nextprops.addState
    });
  }

  render() {
    return (
      <main id="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/info" component={Info} />
          <Route path="/contacts" component={Contacts} />
          <Route
            path="/list"
            render={props => (
              <List activeSort={this.state.activeSort} {...props} />
            )}
          />
          <Route path="/listform/:id?" component={ListForm} />
          <Redirect to="/" />
        </Switch>
      </main>
    );
  }
}

export default Main;

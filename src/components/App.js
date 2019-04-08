import React, { Component } from "react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";

import "../styles/App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSort: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(activeSort) {
    this.setState({
      activeSort: activeSort
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Header addState={this.handleChange} />
        <Main addState={this.state.activeSort} />
      </BrowserRouter>
    );
  }
}

export default App;

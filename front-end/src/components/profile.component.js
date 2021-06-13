import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.access_token.substring(0, 20)} ...{" "}
          {currentUser.access_token.substr(currentUser.access_token.length - 20)}
        </p>
        <p>
          <strong>UserID:</strong>{" "}
          {(atob(currentUser.access_token.split(".")[1])).substr(18,1)}

        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.data}
        </p>

      </div>: null}
      </div>
    );
  }
}

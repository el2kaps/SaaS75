import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import jwt from 'jwt-decode'

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
    console.log("OOOOOOO")
    console.log(currentUser)
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    const theuser = currentUser.access_token;
    console.log("the user")
    console.log(theuser)
    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>Profile</strong> {jwt(theuser).user.name}
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {
            currentUser.access_token.substring(0, 20)} ...{" "}
          {currentUser.access_token.substr(currentUser.access_token.length - 20)}
        </p>
        <p>
          <strong>UserID:</strong>{" "}
          {jwt(theuser).user.UserID}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {jwt(theuser).user.email}
        </p>

      </div>: null}
      </div>
    );
  }
}

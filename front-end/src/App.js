import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import CreateQuestionComponent from "./components/create-question.component";
import ViewQuestionsComponent from "./components/view-questions.component";
import CreateAnswerComponent from "./components/create-answer.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      //showModeratorBoard: false,
      //showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    console.log("CIAPPPP");
    const user = AuthService.getCurrentUser();
    console.log(user);

    if (user) {
      console.log("User!!!");
      this.setState({
        currentUser: user,
        //showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        //showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    console.log("Not user");
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    //const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-danger">
          <Link to={"/"} className="navbar-brand">
            AskMeAnything
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
            )}
          </div>

          {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/CreateQuestion"} className="nav-link">
                    Ask something...
                  </Link>
                </li>

                  <li className="nav-item">
                    <Link to={"/CreateAnswer"} className="nav-link">
                      Answer
                    </Link>
                  </li>

                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/CreateQuestion" component={CreateQuestionComponent} />
            <Route exact path="/CreateAnswer" component={CreateAnswerComponent} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="" component={ViewQuestionsComponent} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

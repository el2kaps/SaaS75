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
import CreateQuestionComponent from "./components/create-question.component";
import ViewQuestionsComponent from "./components/view-questions.component";
import CreateAnswerComponent from "./components/create-answer.component";
import QuestionsPerDate from "./components/questions-perdate.component";
import ViewAnswersComponent from "./components/view-answers.component";
import ViewQaComponent from "./components/view-qa.component";
import SearchKeyComponent from "./components/search-key.component";

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

            <li className="nav-item">
              <Link to={"/viewqa"} className="nav-link">
                Q&A
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/keywordsearch"} className="nav-link">
                Keyword-Search
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/questions"} className="nav-link">
                View Questions
              </Link>
            </li>

            {currentUser && (
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
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
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
          ) : (
              <div className="navbar-nav ml-auto">
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
            <Route exact path="/viewqa" component={ViewQaComponent} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/questions" component={ViewQuestionsComponent} />
            <Route exact path="/keywordsearch" component={SearchKeyComponent} />
            <Route exact path="/answers" component={ViewAnswersComponent} />
            <Route exact path="/countperdate" component={QuestionsPerDate} />
            <Route path="/user" component={BoardUser} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

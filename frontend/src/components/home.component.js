import React, { Component } from "react";
import {CanvasJSChart} from 'canvasjs-react-charts'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/*var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;*/

import HomepageService from "../services/homepage.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

export default class Home extends Component {
  constructor(props) {
    super(props);
    //this.sayHello = this.sayHello.bind(this);
    //this.handleDate = this.handleDate.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    //this.onButtonClickHandler = this.onButtonClickHandler(this);
    this.toggleText = this.toggleText.bind(this);
    //this.toDisplay = this.toDisplay.bind(this);
    this.state = {
      last_weak: 0,
      yesterday:10,
      today:5,
      given_date:'2021-07-05',
      showMessage: false,
      to_display: 0
    };
  }


  toggleText() {
    console.log("Tooglee")
    /*this.setState({
      to_display: HomepageService.countPerDate(this.state.given_date)
          .then((response) => {
            console.log("Log in temp")
            console.log(this.state.given_date)
            return response.data
          })
    });*/
    var text = document.getElementById("demo");
    if (text.style.display === "none") {
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  }

  async onChangeDate(e) {
    console.log("Change State!!!!!")
    this.setState({
      given_date: e.target.value
    });
  }

  async toDisplay() {
    console.log("TO DISPLAY")
    const temp = await HomepageService.countPerDate(this.state.given_date)
        .then((response) => {
          console.log("Log in temp")
          console.log(this.state.given_date)
          return response.data
        })
    /*console.log("TEMP")
    console.log(temp)
    this.setState({
      to_display: temp
    });
    console.log("Change State2!!!!!")
    console.log(this.state.given_date);
    console.log(this.state.to_display)*/
    return temp;
  }


  async componentDidMount() {
    const lw = await HomepageService.lastweek();
    const yester = await HomepageService.yesterday()
    const tod = await HomepageService.today()
    console.log(tod)
    this.setState({
      last_weak: lw,
      yesterday: yester,
      today: tod
    })
  }

  render() {
    /*return (
      <div className="container">
        <header className="jumbotron">
          <h3>"Hello"</h3>
        </header>
      </div>
    );*/

    const options = {
      title: {
        text: "Questions Asked"
      },
      data: [{
        type: "column",
        dataPoints: [
          {label: "Last Weak", y: this.state.last_weak},
          {label: "Yesterday", y: this.state.yesterday},
          {label: "Today", y: this.state.today}
        ]
      }]
    }
    const mystyle = {
      color: "black",
      //backgroundColor: "DodgerBlue",
      padding: "0.5px",
      fontFamily: "Arial",
      fontSize: "20px",
      textAlign: "center"
    };
    console.log("ENADYOOOOOOO---------------------")
    console.log(this.state.given_date)
    console.log(typeof this.state.given_date)
    //const to_diplay = HomepageService.countPerDate(this.state.given_date);
    console.log("Smileee")
    //console.log(to_diplay)
    return (
        <div>
          <div className="container">
            <header className="jumbotron">
              <h3>Welcome to AskMeAnything!</h3>
              <p style={mystyle}>Here you can:</p>
              <p style={mystyle}>Login and ask questions - Search for answers and answer questions</p>
              <p style={mystyle}>Manage your account and posts - View statistics about questions and answers</p>
            </header>
            <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
            />
          </div>
          <Form>
            <div className="form-group">
              <label>Search questions per date</label>
              <Input
                  className="form-control"
                  //name="password"
                  value={this.state.given_date}
                  onChange={this.onChangeDate}
                  //validations={[required]}
              />
            </div>
            <button type='button' onClick={this.toggleText}>Search</button>
            {console.log("Inside html")}
            <p id='demo'>{this.toDisplay.bind(this)}</p>
          </Form>

          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    );
  }
}

import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";


import AnswersService from "../services/answers.service";
import axios from "axios";
import {Dropdown} from "bootstrap/js/src";
import UserService from "../services/user.service";


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

async function OurOptions(QuestionsOptions) {
    //const QuestionsOptions = await axios.get("http://localhost:3000/questions/list");
    //const QuestionsOptions = QuestionsOptions_.data
    console.log("Axios return")
    console.log(QuestionsOptions)
    var QuestionArr = [];
    var QuestionArr2 = [];
    console.log("typeof empty")
    console.log(typeof QuestionArr2)
    console.log("-------------")
    for (var i in QuestionsOptions) {
        QuestionArr.push([QuestionsOptions [i]]); //[]
        console.log(QuestionsOptions[i])
    }
    console.log("Axios return2")
    console.log("Qusetion Arr")
    console.log(QuestionArr)
    console.log("Type Of Question Array")
    console.log(typeof QuestionArr)
    console.log("*******************")
    for (var i in QuestionArr[0][0].ret2) {
        QuestionArr2.push(parseInt((QuestionArr[0][0].ret2)[i].Q_ID));
        //console.log((QuestionArr[0][0].ret2)[i].Q_ID)
    }
    console.log(QuestionArr2)
    console.log("typeof OurOptions")
    //console.log(typeof QuestionArr2[0])
    console.log(Array.isArray(QuestionArr2))
    console.log("xxxxxxxxxxxxxxxxxxx")
    return QuestionArr2;
}

export default class CreateAnswerComponent extends Component {
    constructor(props) {
        super(props);
        this.handleCreateAnswer = this.handleCreateAnswer.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.state = {
            text: "",
            Q_ID: 0,
            author: "",
            successful: false,
            message: "",
            allQuestions:"",
            content:""
        };
    }

    async componentDidMount() {
        console.log("Heloo");
        await axios.get("http://localhost:3000/questions/list").then(
            response => {
                this.setState({
                    allQuestions: OurOptions(response)
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            });
    }


    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleCancel(e){
        e.preventDefault()
        this.props.history.push('/home');
        window.location.reload();
    }


    populateOptions(options) {
        //console.log("Options")
        //console.log(options)
        console.log("typeof Options")
        console.log(typeof options)
        //console.log(Array.isArray(options))
        console.log("xxxxxxxxxxxxxxxxxxx")
        options.map((option, index) => {
            return <option key={index} value={option}>{option}</option>
        });
    }

    handleCreateAnswer(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AnswersService.create(
                this.state.text,
                this.Q_ID,
                this.state.author,)
                .then(
                    () => {
                        this.props.history.push('questions');
                        window.location.reload();
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            loading: false,
                            message: resMessage
                        });
                    }
                );
        } else {
            this.setState({
                //message: response.data.message,
                successful: true
            });
        }
    }



    render() {
        //const x = await this.OurOptions();
        //console.log("HEEEEEEEEEEEEEEEEEEEELP")
        //console.log(Array.isArray(x));
        //this.populateOptions(x);
        return (

            <div className="col-md-12">
                <div className="card card-question">
                    <img
                        src="../man-with-question-01.png"
                        alt="question-img"
                        className="profile-img-card"
                    />
                    <Form
                        onSubmit={this.handleCreateAnswer}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <header className="form-group">
                                    <h1>
                                        <strong>{"Answer a question"}</strong>
                                    </h1>
                                </header>

                                <select name="selectList" id="selectList">
                                    {this.populateOptions(this.state.allQuestions)}
                                </select>

                                <div className="form-group">
                                    <label htmlFor="text">Your Answer</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.onChangeText}
                                        //validations={[required, email]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="author">Author</label>
                                    <Input
                                        type="author"
                                        className="form-control"
                                        name="author"
                                        value={this.state.author}
                                        //onChange={this.onChangePassword}
                                        //validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Submit</button>
                                    <button onClick={this.handleCancel.bind(this)}>Never Mind</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>

        );
    }
}



import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";


import AnswersService from "../services/answers.service";
import axios from "axios";
import {Dropdown} from "bootstrap/js/src";
//import Select from "react-select/src/Select";
import Select from 'react-select'


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class CreateAnswerComponent extends Component {
    constructor(props) {
        super(props);
        this.handleCreateAnswer = this.handleCreateAnswer.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeMenu = this.onChangeMenu.bind(this);
        //this.handleChangeMenu = this.handleChangeMenu.bind(this)
        //this.OurOptions() = this.OurOptions.bind(this);
        this.state = {
            text: "",
            //Q_ID: 0,
            //author: "",
            successful: false,
            message: "",
            allQuestions: [],
            selected_id: 0,
            selected_title: '',
            data:[]
        };
    }

    componentDidMount() {
        this.OurOptions();
        console.log("this.state.data")
        console.log(this.state.data)
    }

    successMessage() {
        alert("Answer submitted successfully!")
    }

    onChangeText(e) {
        console.log("Text print:")
        console.log(e.target.value)
        this.setState({
            text: e.target.value
        });
    }

    onChangeAuthor(e) {
        console.log("Author print:")
        console.log(e.target.value)
        this.setState({
            author: parseInt(e.target.value)
        });
    }

    onChangeMenu(e){
        console.log("dropdown click")
        console.log(e)
        //console.log(e.target.key)
        console.log("d*********")
        this.setState({
            selected_id: e.value,
            selected_title:e.label
                //.target.value
        });
        console.log("Goodmorninf")
        console.log(this.state.selected_id)
        console.log(this.state.selected_title)
    }


    handleCancel(e) {
        e.preventDefault()
        this.props.history.push('/home');
        window.location.reload();
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
                this.state.selected_id,)
                .then(
                    () => {
                        //this.props.history.push('answers');
                        //window.location.reload();
                        this.successMessage()
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

    async OurOptions() {
        /*const res = await axios.get("http://localhost:3001/questions");
        const data = res.data

        const options = data.map(d => ({
            "value" : d.id,
            "label" : d.name

        }))

        this.setState({allQuestions: options})*/
        try {
            const QuestionsOptions = await axios.get("http://localhost:3001/questions");
            //const QuestionsOptions = QuestionsOptions_.data
            console.log("Axios return")
            console.log(QuestionsOptions.data[0].title)
            var QuestionArr = [];
            for (var i in QuestionsOptions.data) {
                QuestionArr.push(QuestionsOptions.data[i].title);
            }
            /*this.setState({
                allQuestions: QuestionArr
            });*/
            var id=0;
            const options = QuestionArr.map(d => ({
                "value" : (++id),
                "label" : d
            }))
            this.setState({
                allQuestions: options
            });
        }catch (err) {
            console.log(err);
        }

    }

    render() {
        //const x = this.OurOptions();
        //console.log("HEEEEEEEEEEEEEEEEEEEELP")
        //console.log(Array.isArray(x));
        //this.populateOptions(x);
        const q_options = this.state.data.map(d => ({
            "value" : d.id,
            "label" : d.name

        }))
            /*this.state.allQuestions ?.map((option, index) => (
            <option key={index} value={option}>{option}</option>
        ));*/
        return (

            <div className="col-md-12">
                <div className="card card-question">
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
                                <Select options={this.state.allQuestions} onChange={this.onChangeMenu} />

                                <div className="form-group">
                                    <label htmlFor="text">Your Answer</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.onChangeText}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Submit</button>
                                    <button className="btn btn-primary btn-block" onClick={this.handleCancel.bind(this)}>Never Mind</button>
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
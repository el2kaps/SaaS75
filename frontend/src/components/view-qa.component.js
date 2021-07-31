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

export default class ViewQaComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeMenu = this.onChangeMenu.bind(this);
        this.state = {
            allQuestions: [],
            selected_id: 0,
            selected_title: '',
            display: false,
            answers:[]
        };
    }

    componentDidMount() {
        this.OurOptions();
    }

    onChangeMenu(e){
        this.setState({
            selected_id: e.value,
            selected_title:e.label
            //.target.value
        });
    }

    handleCancel(e) {
        e.preventDefault()
        this.props.history.push('/home');
        window.location.reload();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const answ = await AnswersService.findAnswers(this.state.selected_id)
        this.setState({
            display: true,
            answers: answ
        });
        console.log("View QA Submit")
        console.log(this.state.answers)
    }

    async OurOptions() {
        try {
            const QuestionsOptions = await axios.get("http://localhost:3001/questions");
            //const QuestionsOptions = QuestionsOptions_.data
            console.log("Axios return777")
            console.log(QuestionsOptions.data[0])
            var QuestionArr = [];
            for (var i in QuestionsOptions.data) {
                QuestionArr.push(QuestionsOptions.data[i].title);
            }
            console.log("All options1")
            var id=0;
            const options = QuestionArr.map(d => ({
                "value" : (id=id+1),
                "label" : d
            }))
            this.setState({
                allQuestions: options
            });
            console.log("All options")
            console.log(this.state.allQuestions)
            /*this.setState({
                allQuestions: QuestionArr
            });*/
        }catch (err) {
            console.log(err);
        }

    }

    render() {
        return (
            <div  className="card card-question">
                <header className="form-group">
                    <h1>
                        <strong>{"Find Answers"}</strong>
                    </h1>
                </header>
                <div>
                    <Select options={this.state.allQuestions} onChange={this.onChangeMenu} />
                </div>
                <p></p>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this)}>View Answers</button>
                    {console.log("Answer Key debug!!")}
                    {console.log((this.state.answers))}
                    {console.log((typeof this.state.answers))}
                    {this.state.display && this.state.answers.map(answ => (<p><strong>Answ_ID:</strong>{" "} {answ.A_ID} <br/>  <strong>Answer:</strong>{" "} {answ.text}</p>))}
                    <button className="btn btn-primary btn-block" onClick={this.handleCancel.bind(this)}>Home</button>
                </div>
            </div>

        );
    }
}
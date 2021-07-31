import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";


import axios from "axios";
import QuestionsService from "../services/questions.service";
import {Dropdown} from "bootstrap/js/src";
//import Select from "react-select/src/Select";
import Select from 'react-select'
import SearchKeywordComponent from "./search-keyword.component";


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class SearchKeyComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeMenu = this.onChangeMenu.bind(this);
        this.state = {
            allKeywords: [],
            selected_key: '',
            display: false,
            questions:[]
        };
    }

    componentDidMount() {
        this.OurOptions();
    }

    onChangeMenu(e){
        this.setState({
            //selected_id: e.value,
            selected_key:e.label
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
        const quest = await QuestionsService.keywordSearch(this.state.selected_key)
        this.setState({
            display: true,
            questions: quest
        });
        console.log("View Search Keyword Submit")
        console.log(this.state.questions)
    }

    async OurOptions() {
        try {
            const KeywordOptions = await axios.get("http://localhost:3001/keywords/findall");
            //const QuestionsOptions = QuestionsOptions_.data
            console.log("Axios return777")
            console.log(KeywordOptions.data[0])
            var KeywordArr = [];
            for (var i in KeywordOptions.data) {
                KeywordArr.push(KeywordOptions.data[i].keyword);
            }
            console.log("All options1")
            var id=0;
            const options = KeywordArr.map(d => ({
                "value" : (id=id+1),
                "label" : d
            }))
            this.setState({
                allKeywords: options
            });
            console.log("All options")
            console.log(this.state.allKeywords)
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
                        <strong>{"Keyword-Search"}</strong>
                    </h1>
                </header>
                <div>
                    <Select options={this.state.allKeywords} onChange={this.onChangeMenu} />
                </div>
                <p></p>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" onClick={this.handleSubmit.bind(this)}>Search</button>
                    {console.log("Serack Key debug!!")}
                    {console.log((this.state.questions))}
                    {console.log((typeof this.state.questions))}
                    {this.state.display && this.state.questions.map(answ => (<p><strong>Title:</strong>{" "} {answ.title} <br/>  <strong>Text:</strong>{" "} {answ.text}</p>))}
                    <button className="btn btn-primary btn-block" onClick={this.handleCancel.bind(this)}>Home</button>
                </div>
            </div>

        );
    }
}
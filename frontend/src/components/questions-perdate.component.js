import React, { Component } from "react";

import QuestionsService from "../services/questions.service";
import AuthService from "../services/auth.service";
import {Redirect} from "react-router-dom";

export default class QuestionsPerdateComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions:[] //maybe array
        };
    }

    /* componentDidMount() {
         const allQuestions = QuestionsService.viewAllQuestions()
         this.setState({ questions: allQuestions})
     }*/

    componentDidMount() {
        fetch('http://localhost:3003/lastweek/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        questions: result
                    });
                },
                // error handler
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {

        const { questions } = this.state;

        return (
            <div className="col">
                <h1>Questions</h1>
                <strong>Full list</strong>
                {questions.map(question => (<p><strong>Title:</strong>{" "} {question.title} <br/>  <strong>Text:</strong>{" "} {question.text}</p>))}

            </div>
        );
    }
}

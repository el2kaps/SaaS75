import React, { Component } from "react";

import QuestionsService from "../services/questions.service";
import AuthService from "../services/auth.service";
import {Redirect} from "react-router-dom";

export default class ViewAnswersComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers:[] //maybe array
        };
    }

    /* componentDidMount() {
         const allQuestions = QuestionsService.viewAllQuestions()
         this.setState({ questions: allQuestions})
     }*/

    componentDidMount() {
        fetch('http://localhost:3001/answers/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        answers: result
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

        const { answers } = this.state;

        return (
            <div className="col">
                <h1>Answers</h1>
                <strong>Full list</strong>
                {answers.map(answer => (<p><strong>Text:</strong>{" "} {answer.text}</p>))}
                {console.log("Problem with QID")}
                {console.log(answers[0])}
            </div>
        );
    }
}

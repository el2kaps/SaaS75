import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import QuestionsService from "../services/questions.service";
import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vtitle = value => {
    if (value.length < 3 || value.length > 100) {
        return (
            <div className="alert alert-danger" role="alert">
                The title must be between 3 and 100 characters.
            </div>
        );
    }
};
export default class SearchKeywordComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeKeyword = this.onChangeKeyword.bind(this);

        this.state = {
            keyword: "",
            questions: []
        };
    }

    onChangeKeyword(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleCancel(e){
        e.preventDefault()
        this.props.history.push('/home');
        window.location.reload();
    }

    handleCreateQuestion(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            QuestionsService.key_search(this.state.keyword)
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
        return (<div className="col-md-12">
                <div className="card card-question">
                    <img
                        src="../man-with-question-01.png"
                        alt="question-img"
                        className="profile-img-card"
                    />
                    <Form
                        onSubmit={this.handleCreateQuestion}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <header className="form-group">
                                    <h1>
                                        <strong>{"Ask a question"}</strong>
                                    </h1>
                                </header>
                                <div className="form-group">
                                    <label htmlFor="title">Question Title</label>
                                    <Input
                                        size="50"
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}
                                        validations={[required, vtitle]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="text">Question Text</label>
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
                                    <label htmlFor="text">Keywords</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="Keywords"
                                        value={this.state.keywords}
                                        onChange={this.onChangeKeyword}
                                        //validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Submit</button>
                                    <button className="btn btn-primary btn-block" onClick={this.handleCancel.bind(this)}>Cancel</button>
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
                            style={{ display: "none" }}
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



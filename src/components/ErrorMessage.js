import React, { useState } from "react";
import firebase from "../Firebase";

import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

const ErrorMessage = (props) => {
    var statement = '';
    switch(props.type) {
        case "questions":
            statement = "There appear to be no questions set for this quiz.";
        break;
        case "quiz":
            statement = "There seems to have been an error with this quiz.";
        break;
        default: 
            statement = "There has been an error";
        }

  return (
    <>
      <Col className="bg-dark text-light p-4 m-5 text-center">
      <Row className="p-5">
     <h3>{statement}</h3>
     
      </Row>
      <Row>
      <Link to='/'><h4>Return to home</h4></Link>
      </Row>
      <Row><h6>or</h6></Row>
      <Row className="mb-5">
        <Link to={`/admin/edit/quiz/${props.quiz.key}/${props.quiz.quizName}`}><h4>Edit quiz</h4></Link>
      </Row>
      </Col>
    </>
  );
};

export default ErrorMessage;
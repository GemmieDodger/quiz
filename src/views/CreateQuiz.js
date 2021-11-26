import React, { useEffect, useState } from "react";
import firebase from "../Firebase";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const CreateQuiz = (props) => {
  const [quiz, setQuiz] = useState({
    quizName: "",
  });

  const onChangeQuiz = (e) => {
    setQuiz({ quizName: e.target.value });
    console.log(quiz.quizName);
  };

  const onSubmitQuiz = (e) => {
    e.preventDefault();
    console.log("submit here");
    const { quizName } = quiz;

    const ref = firebase.firestore().collection("quizzes");
    console.log(ref);

    ref
      .add({ quizName })
      .then((docRef) => {
        setQuiz({ quizName: "" });
        props.history.push(`/`);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <>
    <div>
      <Header />
      <div>
        <Container>
          <Row className="bg-dark text-light p-4 m-5">
            <h2>ADD A QUIZ</h2>
            <Form onSubmit={onSubmitQuiz}>
              <Form.Group className="mb-3" controlId="quizName">
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Add quiz name here"
                  name="quizName"
                  onChange={onChangeQuiz}
                />
              </Form.Group>
              <Button variant="primary" className="m-4 " type="submit">
                Create new quiz
              </Button>
            </Form>
          </Row>
        </Container>
      </div>
    </div>
    </>
  );
};

export default CreateQuiz;
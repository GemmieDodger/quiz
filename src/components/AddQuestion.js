import React, { useEffect, useState, useCallback } from "react";
import CodeBox from "../components/CodeBox";
import firebase from "../Firebase";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
// import {getFirestore, collection, getDocs, onSnapshot, doc, setdoc } from 'firebase/firestore'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { cp } from "fs";
import { selectDocEnd } from "@codemirror/commands";
// import { StateEffect } from "@codemirror/state";

const AddQuestion = (props) => {
  // state for display of quiz
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [propsCode, setPropsCode] = useState("");

  // state for add new quiz question
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    answerOptions: [
      { answerText: "", isCorrect: "" },
      { answerText: "", isCorrect: "" },
      { answerText: "", isCorrect: "" },
    ],
    code: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    if (name.includes("answerText")) {
      const ref = parseInt(name.match(/\d+/)[0]);
      newQuestion.answerOptions[ref].isCorrect = e.target.value;
      setNewQuestion(newQuestion)
    } else if (name.includes("isCorrect")) {
      const ref = parseInt(name.match(/\d+/)[0]);
      newQuestion.answerOptions[ref].isCorrect = e.target.value;
      setNewQuestion(newQuestion)
    } else {
      newQuestion[name] = e.target.value;
      setNewQuestion(newQuestion);
    }
  };

  const onSubmit = (e) => {
    const col = firebase
      .firestore()
      .collection("quizzes")
      .doc(props.match.params.id)
      .collection("questions");
    e.preventDefault();

    const { answerOptions, code, questionText } = newQuestion;
    col
      .add({
        answerOptions,
        code,
        questionText,
      })
      .then((docRef) => {
        setNewQuestion({
          answerOptions: [
            { answerText: "", isCorrect: "" },
            { answerText: "", isCorrect: "" },
            { answerText: "", isCorrect: "" },
          ],
          code: "",
          questionText: "",
        });
        props.history.push(
          `/admin/edit/quiz/${props.match.params.id}/${quiz.quizname}`
        );
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const { answerOptions, code, questionText } = newQuestion;
  try {
    return (
      <div>
                       <Form onSubmit={onSubmit}>
                  <Row>
                    <Col>
                      <div className="mb-1">
                        <span>ADD NEW QUESTION</span>
                      </div>
                      <Form.Group className="mb-3" controlId="questionText">
                        <Form.Label>
                          What question would you like to ask?
                        </Form.Label>
                        <Form.Control
                          type="textarea"
                          rows={2}
                          placeholder="Ask question here"
                          name="questionText"
                          defaultValue={questionText}
                          onChange={onChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="code">
                        <Form.Label>
                          Would you like to provide some code for this question?{" "}
                        </Form.Label>
                        <Row>
                          <Form.Text className="text-muted">
                            Write code in text, with no indents or formatting.
                            JavaScript is formatted on display.
                          </Form.Text>
                        </Row>
                        <Form.Control
                          type="textarea"
                          rows={6}
                          placeholder="if (a < b) { console.log('Yeah!') }"
                          name="code"
                          defaultValue={code}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Stack gap={3} className="m-auto">
                        <Row>
                          <Col>
                            <Row>
                              <Col>
                                <Form.Group
                                  className="mb-3"
                                  controlId="answerOption0"
                                >
                                  <Form.Label>
                                    Please suggest option 1?
                                  </Form.Label>
                                  <Form.Control
                                    type="textarea"
                                    rows={1}
                                    placeholder="Option 1"
                                    name="answerOptions[0].answerText"
                                    defaultValue={answerOptions[0].answerText}
                                    onChange={onChange}
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Label>Option 1 is</Form.Label>
                                <Form.Select
                                  aria-label="The answer is correct or incorrect"
                                  name="answerOptions[0].isCorrect"
                                  onChange={onChange}
                                >
                                  <option value="false">Incorrect</option>
                                  <option value="true">Correct</option>
                                </Form.Select>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Group
                                  className="mb-3"
                                  controlId="answerOption1"
                                >
                                  <Form.Label>
                                    Please suggest option 2?
                                  </Form.Label>
                                  <Form.Control
                                    type="textarea"
                                    rows={1}
                                    placeholder="Option 2"
                                    name="answerOptions[1].answerText"
                                    defaultValue={answerOptions[1].answerText}
                                    onChange={onChange}
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Label>Option 2 is</Form.Label>
                                <Form.Select
                                  aria-label="The answer is correct or incorrect"
                                  name="answerOptions[1].isCorrect"
                                  onChange={onChange}
                                >
                                  <option value="false">Incorrect</option>
                                  <option value="true">Correct</option>
                                </Form.Select>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Group controlId="answerOption2">
                                  <Form.Label>
                                    Please suggest option 3?
                                  </Form.Label>
                                  <Form.Control
                                    type="textarea"
                                    rows={1}
                                    placeholder="Option 3"
                                    name="answerOptions[2].answerText"
                                    defaultValue={answerOptions[2].answerText}
                                    onChange={onChange}
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Label>Option 3 is</Form.Label>
                                <Form.Select
                                  aria-label="The answer is correct or incorrect"
                                  name="answerOptions[2].isCorrect"
                                  onChange={onChange}
                                >
                                  <option value="false">Incorrect</option>
                                  <option value="true">Correct</option>
                                </Form.Select>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Stack>
                    </Col>
                  </Row>
                  <Row>
                    <Button variant="primary" className="mt-4" type="submit">
                      Add Question
                    </Button>
                  </Row>
                </Form>
         
      </div>
    );
  } catch (e) {
    console.log(e);
    return <h3>There has been an error</h3>;
  }
};

export default AddQuestion;

const QuizName = styled.h4`
  textalign: "right";
  padding: 1em;
`;
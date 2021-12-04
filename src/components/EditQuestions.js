import React, { useEffect, useState } from "react";
import firebase from "../Firebase";

// import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";

const EditQuestions = (props) => {
  // state for display of quiz
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    answerOptions: [
      { answerText: "", isCorrect: "" },
      { answerText: "", isCorrect: "" },
      { answerText: "", isCorrect: "" },
    ],
    code: "",
    timestamp: 0,
  });
  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onCollectionUpdate = (querySnapshot) => {
    const questions = [];
    querySnapshot.forEach((doc) => {
      const { key, questionText, answerOptions, code, timestamp } = doc.data();
      questions.push({
        key: doc.id, // DocumentSnapshot
        doc,
        questionText,
        answerOptions,
        code,
        timestamp,
      });
    });
    setQuestions(questions);
  };

  useEffect(() => {
    const col = firebase
      .firestore()
      .collection("quizzes")
      .doc(props.id)
      .collection("questions")
      .orderBy("timestamp");
    const ref = firebase.firestore().collection("quizzes").doc(props.id);

    ref.get().then((doc) => {
      if (doc.exists) {
        setQuiz(doc.data());
        setIsLoading(false);
      } else {
        console.log("No such document!");
      }
    });
    const unsubscribe = col.onSnapshot(onCollectionUpdate);
    return () => unsubscribe();
  }, [deleted]); // , props.match.params.id

  const onChangeQuestions = (e) => {
    const name = e.target.name;
    console.log(name)
    const questionRef = parseInt(name.match(/\d+/)[0]);
    if (name.includes("answerText")) {
      const ref = parseInt(name.match(/\d+/g)[1]);
      questions[questionRef].answerOptions[ref].answerText = e.target.value;
      console.log(e.target.value)
      console.log(questions[questionRef].answerOptions[ref].answerText)
    } else if (name.includes("isCorrect")) {
      const ref = parseInt(name.match(/\d+/g)[1]);
      questions[questionRef].answerOptions[ref].isCorrect = e.target.value;
      console.log(e.target.value)
      console.log(questions[questionRef].answerOptions[ref].isCorrect)
    } else if (name.includes("code")) {
      questions[questionRef]["code"] = e.target.value;
      console.log(e.target.value)
      console.log(questions[questionRef]["code"])
    } else if (name.includes("questionText")) {
      questions[questionRef]["questionText"] = e.target.value;
      console.log(e.target.value)
      console.log(questions[questionRef]["questionText"])
    }
    setQuestions(questions);
  };

  const onSubmitQuestions = (e) => {
    e.preventDefault();

    const updatedQuestions = questions;

    questions.map((question, index) => {
      const updateRef = firebase
        .firestore()
        .collection("quizzes")
        .doc(props.id)
        .collection("questions")
        .doc(question.key);

      const { key, questionText, answerOptions, code, timestamp } = question;
      // updatedQuestions[index] = question;
      updateRef
        .set({
          key,
          questionText,
          answerOptions,
          code,
          timestamp,
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        handleShow()
    });
  };

  const deleteQuestion = (questionId) => {
    firebase
      .firestore()
      .collection("quizzes")
      .doc(props.id)
      .collection("questions")
      .doc(questionId)
      .delete()
      .then(() => {
        setDeleted(deleted ? true : false);
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const { answerOptions, code, questionText, timestamp } = newQuestion;
  if (questions[0]) {
    return (
      <>
        <style type="text/css">
          {`
  .h4-quizAlign {
    textalign: "right";
    padding: 1em;
  }

  .btn-flat {
    background-color: purple;
    color: white;
  }

  .btn-xxl {
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
  }
  `}
        </style>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your changes have been saved</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
        <Row className="bg-dark text-light p-4 m-5">
          <h2>UPDATE QUESTIONS</h2>
          <Form onSubmit={onSubmitQuestions}>
            {questions.map((question, index) => (
              <>
                <Row className="mb-4 mt-4" test-id="editQuestion" key={index}>
                  <Col>
                    <div className="mb-1">
                      <span>
                        <h3>Question {index + 1}</h3>
                      </span>
                    </div>
                    <Form.Group className="mb-3" controlId="questionText">
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder={questions[index].questionText}
                        name={`question[${index}].questionText`}
                        defaultValue={questions[index].questionText}
                        onChange={onChangeQuestions}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="code">
                      <Row>
                        <Form.Text className="text-muted">
                          Write code in text, with no indents or formatting.
                          JavaScript is formatted on display.
                        </Form.Text>
                      </Row>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder={questions[index].code}
                        name={`questions[${index}].code`}
                        defaultValue={questions[index].code}
                        onChange={onChangeQuestions}
                      />
                    </Form.Group>
                    <Row>
                      <Button
                        onClick={deleteQuestion.bind(this, question.key)}
                        className="btn-danger mt-4"
                      >
                        Delete
                      </Button>
                    </Row>
                  </Col>
                  <Col>
                    <Stack gap={3} className="m-auto mt-2">
                      <Row>
                        <Col>
                          <Row>
                            <Col>
                              <Form.Group
                                className="mb-3"
                                controlId={`questions[${index}].answerOption0`}
                              >
                                <Form.Label>Option 1:</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={1}
                                  placeholder={
                                    questions[index].answerOptions[0].answerText
                                  }
                                  name={`questions[${index}].answerOptions[0].answerText`}
                                  defaultValue={
                                    questions[index].answerOptions[0].answerText
                                  }
                                  onChange={onChangeQuestions}
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Label>Option 1 is</Form.Label>
                              <Form.Select
                                aria-label="The answer is correct or incorrect"
                                name={`questions[${index}].answerOptions[0].isCorrect`}
                                onChange={onChangeQuestions}
                                defaultValue={
                                  questions[index].answerOptions[0].isCorrect
                                }
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
                                controlId={`questions[${index}].answerOption1`}
                              >
                                <Form.Label>Option 2?</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={1}
                                  placeholder={
                                    questions[index].answerOptions[1].answerText
                                  }
                                  name={`questions[${index}].answerOptions[1].answerText`}
                                  defaultValue={
                                    questions[index].answerOptions[1].answerText
                                  }
                                  onChange={onChangeQuestions}
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Label>Option 2 is</Form.Label>
                              <Form.Select
                                aria-label="The answer is correct or incorrect"
                                name={`questions[${index}]answerOptions[1].isCorrect`}
                                onChange={onChangeQuestions}
                                defaultValue={
                                  questions[index].answerOptions[1].isCorrect
                                }
                              >
                                <option value="false">Incorrect</option>
                                <option value="true">Correct</option>
                              </Form.Select>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Group
                                controlId={`questions[${index}].answerOption2`}
                              >
                                <Form.Label>Option 3:</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={1}
                                  placeholder={
                                    questions[index].answerOptions[2].answerText
                                  }
                                  name={`questions[${index}].answerOptions[2].answerText`}
                                  defaultValue={
                                    questions[index].answerOptions[2].answerText
                                  }
                                  onChange={onChangeQuestions}
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Label>Option 3 is</Form.Label>
                              <Form.Select
                                aria-label="The answer is correct or incorrect"
                                name={`questions[${index}].answerOptions[2].isCorrect`}
                                onChange={onChangeQuestions}
                                defaultValue={
                                  questions[index].answerOptions[2].isCorrect
                                }
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
                <hr />
              </>
            ))}
            <Button variant="primary" className="m-4 " type="submit">
              Save updates
            </Button>
          </Form>
        </Row>
      </>
    );
  } else {
      return (
          <>
          </>
      )
  }
};

export default EditQuestions;

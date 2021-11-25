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

const EditQuiz = (props) => {
  // state for display of quiz
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [deleted, setDeleted] = useState(false);

  // state for add new quiz question
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


  const col = firebase
  .firestore()
  .collection("quizzes")
  .doc(props.match.params.id)
  .collection("questions");

  const onCollectionUpdate = (querySnapshot) => {
    const questions = [];
    querySnapshot.forEach((doc) => {
      
      const { key, questionText, answerOptions, code, timestamp } = doc.data();
      questions.push({
        key: doc.id,// DocumentSnapshot
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
      .doc(props.match.params.id)
      .collection("questions").orderBy("timestamp");
    const ref = firebase
      .firestore()
      .collection("quizzes")
      .doc(props.match.params.id);

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


  const onChange = (e) => {
    const name = e.target.name;
    if (name.includes("answerText")) {
      const ref = parseInt(name.match(/\d+/)[0]);
      newQuestion.answerOptions[ref].answerText= e.target.value;
      setNewQuestion(newQuestion);
    } else if (name.includes("isCorrect")) {
      const ref = parseInt(name.match(/\d+/)[0]);
      newQuestion.answerOptions[ref].isCorrect = e.target.value;
      setNewQuestion(newQuestion);
    } else {
      newQuestion[name] = e.target.value;
      setNewQuestion(newQuestion);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault()
    const timestamp = new Date().getTime()
    const { questionText, answerOptions, code } = newQuestion;
    col
      .add({
        questionText,
        answerOptions,
        code,
        timestamp
      })
      .then((docRef) => {
        setNewQuestion({
          questionText: "",
          answerOptions: [
            { answerText: "", isCorrect: "" },
            { answerText: "", isCorrect: "" },
            { answerText: "", isCorrect: "" },
          ],
          code: "",
          timestamp: 0,
        });
        props.history.push(
          `/admin/edit/quiz/${props.match.params.id}/${quiz.quizname}`
        );
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const onChangeQuestions = (e) => {
    const name = e.target.name;
    switch (e.target.name) {}
    const questionRef = parseInt(name.match(/\d+/)[0]);
    if (name.includes("answerText")) {
      const ref = parseInt(name.match(/\d+/g)[1]);
      questions[questionRef].answerOptions[ref].answerText = e.target.value;
    } else if (name.includes("isCorrect")) {
      const ref = parseInt(name.match(/\d+/g)[1])
      questions[questionRef].answerOptions[ref].isCorrect = e.target.value;
    } else if (name.includes("code")) {
      questions[questionRef]["code"] = e.target.value; 
    } else if (name.includes("questionText")) {
      questions[questionRef]["code"] = e.target.value; 
    } 
    setQuestions(questions);
  };

  const onSubmitQuestions = (e) => {
    e.preventDefault()

    const updatedQuestions = questions

      questions.map((question, index) => {
        const updateRef = firebase
        .firestore()
        .collection("quizzes")
        .doc(props.match.params.id)
        .collection("questions").doc(question.key);
        console.log(question)

        const { key, questionText, answerOptions, code, timestamp } = question;
        // updatedQuestions[index] = question;
        updateRef.set({
          key,
          questionText,
          answerOptions,
          code,
          timestamp,
        }).catch((error) => {
            console.error("Error adding document: ", error);
          });
    })
   
    
      props.history.push(
        `/admin/edit/quiz/${props.match.params.id}/${quiz.quizname}`
      );
  }

  const deleteQuestion = (questionId) => {
    console.log(questionId)
    firebase
    .firestore()
    .collection("quizzes")
    .doc(props.match.params.id)
    .collection("questions")
    .doc(questionId).delete().then(() => {
        
      setDeleted(deleted ? true : false);
      console.log("Document successfully deleted!");
      props.history.push(
        `/admin/edit/quiz/${props.match.params.id}/${quiz.quizname}`
      );
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }


  const { answerOptions, code, questionText, timestamp } = newQuestion;
  try {
    return (
      <div>
        <Header />
        <QuizName className="text-center">
          You are editing the {quiz.quizname} quiz
        </QuizName>
        <Container>
          {isLoading ? (
            <>
              <div>Loading Quiz questions...</div>
            </>
          ) : (
            <Row >
              <Col>
                <Row className="bg-dark text-light p-4 m-5">
                  <h2>UPDATE QUESTIONS</h2>
                  <Form onSubmit={onSubmitQuestions}>
                    {questions.map((question, index) => (
                      <>
                        <Row className="mb-4 mt-4">
                          <Col>
                            <div className="mb-1">
                              <span><h3>Question {index + 1}</h3></span>
                            </div>
                            <Form.Group
                              className="mb-3"
                              controlId="questionText"
                            >
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
                                  Write code in text, with no indents or
                                  formatting. JavaScript is formatted on
                                  display.
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
                            <Button onClick={deleteQuestion.bind(this, question.key)} className="btn-danger mt-4">Delete</Button>
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
                                            questions[index].answerOptions[0]
                                              .answerText
                                          }
                                          name={`questions[${index}].answerOptions[0].answerText`}
                                          defaultValue={
                                            questions[index].answerOptions[0]
                                              .answerText
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
                                          questions[index].answerOptions[0]
                                            .isCorrect
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
                                            questions[index]
                                              .answerOptions[1].answerText
                                          }
                                          name={`questions[${index}].answerOptions[1].answerText`}
                                          defaultValue={
                                            questions[index].answerOptions[1]
                                              .answerText
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
                                          questions[index].answerOptions[1]
                                            .isCorrect
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
                                            questions[index]
                                              .answerOptions[2].answerText
                                          }
                                          name={`questions[${index}].answerOptions[2].answerText`}
                                          defaultValue={
                                            questions[index].answerOptions[2]
                                              .answerText
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
                                          questions[index].answerOptions[2]
                                            .isCorrect
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
                        <hr/>
                      </>
                    ))}
                    <Button
                            variant="primary"
                            className="m-4 "
                            as="submit"
                          >
                            Send updated Questions
                          </Button>
                  </Form>
                </Row>
                <CreateForm className="bg-dark text-light p-4 m-5" onSubmit={onSubmit}>
                  <Row>
                    <Col>
                      <div className="mb-1">
                        <h2>ADD NEW QUESTION</h2>
                      </div>
                      <Form.Group className="mb-3" controlId="questionText">
                        <Form.Label>
                          What question would you like to ask?
                        </Form.Label>
                        <Form.Control
                          as="textarea"
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
                          as="textarea"
                          rows={3}
                          placeholder="if (a < b) { console.log('Yeah!') }"
                          name="code"
                          defaultValue={code}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="mt-5">
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
                                    as="textarea"
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
                                    as="textarea"
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
                                    as="textarea"
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
                    <Button variant="primary" className="mt-4" as="submit">
                      Add Question
                    </Button>
                  </Row>
                </CreateForm>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  } catch (e) {
    console.log(e);
    return <h3>There has been an error</h3>;
  }
};

export default EditQuiz;

const QuizName = styled.h4`
  textalign: "right";
  padding: 1em;
`;

const CreateForm = styled(Form)`

  margin: 2em;
`;

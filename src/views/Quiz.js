import React, { useEffect, useState } from "react";
import firebase from "../Firebase";

import { Link } from "react-router-dom";

import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";

import CodeBox from "../components/CodeBox";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import Header from "../components/Header";

const Quiz = (props) => {
  // state for game play
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [position, setPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [propsCode, setPropsCode] = useState("");
  const [showErrorScreen, setShowErrorScreen] = useState(false);

  const onCollectionUpdate = (querySnapshot) => {
    const questions = [];
    querySnapshot.forEach((doc) => {
      const { answer, answerOptions, code, options, questionText } = doc.data();
      questions.push({
        answer, // DocumentSnapshot
        answerOptions,
        code,
        options,
        questionText,
      });
    });
    updatePosition();
    if (questions[0]) {
      setQuestions(questions);
      setPropsCode(questions[currentQuestion].code);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setShowErrorScreen(true);
    }
  };

  useEffect(() => {
    const col = firebase
      .firestore()
      .collection("quizzes")
      .doc(props.match.params.id)
      .collection("questions");
    const ref = firebase
      .firestore()
      .collection("quizzes")
      .doc(props.match.params.id);

    ref.get().then((doc) => {
      if (doc.exists && doc.questions) {
        setQuiz(doc.data());
      } else {
        console.log("No such document!");
      }
    });
    const unsubscribe = col.onSnapshot(onCollectionUpdate);
    return () => unsubscribe();
  }, [propsCode, currentQuestion, showScore]);

  const updatePosition = () => {
    const place = currentQuestion + 1;
    const distributed = 100 / questions.length - 1;
    setPosition(distributed * place );
  };

  const handleAnswerButtonClick = (isCorrect) => {
    const nextQuestion = currentQuestion + 1;
    if (isCorrect) {
      setScore(score + 1);
    }
    setPropsCode("set next question here to be:");

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setPropsCode(questions[nextQuestion].code);
    } else {
      setShowScore(true);
    }
  };

  try {
    return (
      <div>
        <Header />
        <QuizName className="text-center">
          You are competing the {quiz.quizName} quiz
        </QuizName>
        <Container>
          {showErrorScreen ? (
            <>
              <ErrorMessage type="questions" quiz={quiz} />
            </>
          ) : (
            ""
          )}
          {isLoading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              
              <Row className="bg-dark text-light p-4 m-5">
                <Col>
                  {showScore ? (
                    <div className="score-section text-center">
                      <Row>
                        <p className="text-center">
                          You scored {score} out of {questions.length}
                        </p>
                      </Row>
                      <Row>
                        <Link to="/">
                          <Button>Go back to Home</Button>
                        </Link>
                      </Row>
                    </div>
                  ) : (
                    <>
                    <ProgressBar label={`${position}%`} animated now={position} />
                    <Row>
                      <Col>
                        <div className="mb-1">
                          <span>Question {currentQuestion + 1}</span>/
                          {questions.length}
                        </div>
                        <div className="mb-2">
                          {questions[currentQuestion].questionText}
                        </div>
                        {propsCode ? <CodeBox code={propsCode} /> : ""}
                      </Col>
                      <Col>
                        <Stack gap={3} className="m-auto">
                          {questions[currentQuestion].answerOptions.map(
                            (answerOption, index) => (
                              <Button
                                key={answerOption.key}
                                variant="secondary"
                                onClick={() =>
                                  handleAnswerButtonClick(
                                    answerOption.isCorrect
                                  )
                                }
                              >
                                {answerOption.answerText}
                              </Button>
                            )
                          )}
                        </Stack>
                      </Col>
                    </Row>
                    </>
                  )}
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    );
  } catch (e) {
    return (
      <>
        <Header />
        <ErrorMessage type="quiz" quiz={quiz} />
      </>
    );
  }
};

export default Quiz;

const QuizName = styled.h4`
  textalign: "right";
  padding: 1em;
`;

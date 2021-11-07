import React, { useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];

  const handleAnswerButtonClick = (isCorrect) => {
    const nextQuestion = currentQuestion + 1;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <Container >
      <Row className="bg-dark text-light p-4 m-5">
        <Col>
          {showScore ? (
            <div className="score-section">
              You scored {score} out of {questions.length}
            </div>
          ) : (
            <Row >
              <Col>
                <div>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div>{questions[currentQuestion].questionText}</div>
              </Col>
              <Col>
                <Stack gap={3}>
                  {questions[currentQuestion].answerOptions.map(
                    (answerOption, index) => (
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleAnswerButtonClick(answerOption.isCorrect)
                        }
                      >
                        {answerOption.answerText}
                      </Button>
                    )
                  )}
                </Stack>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

// const Quiz = styled.div`
//   background-color: #252d4a;
//   width: 100%;
//   min-height: 200px;
//   height: min-content;
//   border-radius: 15px;
//   padding: 20px;
//   box-shadow: 10px 10px 42px 0px rgba(0, 0, 0, 0.75);
//   display: flex;
//   justify-content: spaceEvenly;
// `;

// const ScoreSection = styled.div`
//   display: flex;
//   font-size: 24px;
//   align-items: center;
// `;

// /* QUESTION/TIMER/LEFT SECTION */
// const QuestionSection = styled.div`
//   width: 100%;
//   position: relative;
// `;

// const QuestionCount = styled.div`
//   margin-bottom: 20px;
// `;

// const QuestionCountInner = styled.span`
//   font-size: 28px;
// `;

// const QuestionText = styled.div`
//   margin-bottom: 12px;
// `;

// const TimerText = styled.div`
//   background: rgb(230, 153, 12);
//   padding: 15px;
//   margin-top: 20px;
//   margin-right: 20px;
//   border: 5px solid rgb(255, 189, 67);
//   border-radius: 15px;
//   text-align: center;
// `;

// /* ANSWERS/RIGHT SECTION */
// const AnswerSection = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const Button = styled.button`
//   width: 100%;
//   font-size: 16px;
//   color: #ffffff;
//   background-color: #252d4a;
//   border-radius: 15px;
//   display: flex;
//   padding: 5px;
//   justify-content: flex-start;
//   align-items: center;
//   border: 5px solid #234668;
//   cursor: pointer;
// `;

// const Correct = styled.div`
//   background-color: #2f922f;
// `;

// const Incorrect = styled.div`
//   background-color: #ff3333;
// `

// // button:focus {
// //   outline: none;
// // }

// // button svg {
// //   margin-right: 5px;
// // }

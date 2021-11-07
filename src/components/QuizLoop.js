import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";


const QuizLoop = (props) => {
  const [state, setState] = useState({
    quiz: []
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ref = props
      // console.log(props.quiz)
    setState(props)
console.log(      state)
    
  }, []);

  const handleAnswerButtonClick = (isCorrect) => {
    const nextQuestion = currentQuestion + 1;
    if (isCorrect) {
      setScore(score + 1);
    }

    // if (nextQuestion < quiz.length) {
    //   setCurrentQuestion(nextQuestion);
    // } else {
    //   setShowScore(true);
    // }
  };

    return (
      <Container >
      { isLoading ? 
              <>{/* <Loader
                height="100"    
                width="100"
              /> */}
              <div>Loading Quiz...</div>
         </>   
      :
        <Row className="bg-dark text-light p-4 m-5">
          <Col> 
            {showScore ? (
              <div className="score-section">
                {/* You scored {score} out of {quiz.questions.length} */}
              </div>
            ) : (
              <Row >
                <Col>
                  {/* <div>
                    <span>Question {currentQuestion + 1}</span>/{quiz.questions.length}
                  </div>
                  <div>{quiz.questions[currentQuestion].questionText}</div>
                </Col>
                <Col>
                  <Stack gap={3}>
                    {quiz.questions[currentQuestion].answerOptions.map(
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
                  </Stack> */}
                </Col>
              </Row>
            )}
          </Col>
         </Row>  
      }
      </Container>
    );
  // } else {
  //   return (
  //     <h3>Yikes! Looks like this quiz isn't ready yet. Head back home for now</h3>
  //   )
  // } 
}

export default QuizLoop;

  // const questions = [
  //   {
  //     questionText: "What is the capital of France?",
  //     answerOptions: [
  //       { answerText: "New York", isCorrect: false },
  //       { answerText: "London", isCorrect: false },
  //       { answerText: "Paris", isCorrect: true },
  //       { answerText: "Dublin", isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: "Who is CEO of Tesla?",
  //     answerOptions: [
  //       { answerText: "Jeff Bezos", isCorrect: false },
  //       { answerText: "Elon Musk", isCorrect: true },
  //       { answerText: "Bill Gates", isCorrect: false },
  //       { answerText: "Tony Stark", isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: "The iPhone was created by which company?",
  //     answerOptions: [
  //       { answerText: "Apple", isCorrect: true },
  //       { answerText: "Intel", isCorrect: false },
  //       { answerText: "Amazon", isCorrect: false },
  //       { answerText: "Microsoft", isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: "How many Harry Potter books are there?",
  //     answerOptions: [
  //       { answerText: "1", isCorrect: false },
  //       { answerText: "4", isCorrect: false },
  //       { answerText: "6", isCorrect: false },
  //       { answerText: "7", isCorrect: true },
  //     ],
  //   },
  // ];

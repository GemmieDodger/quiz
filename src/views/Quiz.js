import React, { useEffect, useState } from "react";
import CodeBox from '../components/CodeBox';
import firebase from "../Firebase";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
// import { StateEffect } from "@codemirror/state";

const  Quiz = (props) => {
  // state for game play
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
    
  const onCollectionUpdate = (querySnapshot) => {
    const questions = [];
    querySnapshot.forEach((doc) => {
      const { answer, answerOptions, code ,options, questionText } = doc.data();
      questions.push({
        answer, // DocumentSnapshot
        answerOptions,
        code,
        options,
        questionText,
      });
    });
    setQuestions(questions);
    // this outputs fine
  }
  
  useEffect(() => {
    const col = firebase.firestore().collection('quizzes').doc(props.match.params.id).collection('questions');
    const ref = firebase.firestore().collection('quizzes').doc(props.match.params.id);
    
    ref.get().then((doc) => {
      if (doc.exists) {
          setQuiz(doc.data());
          setIsLoading(false);
      } else {
        console.log("No such document!");
      }
    });
    const unsubscribe = col.onSnapshot(onCollectionUpdate);

    console.log(questions)
    return () => unsubscribe()
  }, [questions, props.match.params.id]);

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
  try {
  return (
    <div>
      <Header />
      <h1>You are competing on the quiz of: {quiz.quizname}</h1>
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
              <div className="score-section text-center">
              <Row>
                <p className="text-center">You scored {score} out of {questions.length}</p>
                </Row>
                <Row>
                <Link to='/'><Button>Go back to Home</Button></Link>
                </Row>
              </div>
            ) : (
              <Row >
                <Col>
                  <div>
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div>{questions[currentQuestion].questionText}</div>
                  <CodeBox code={questions[currentQuestion].code}/>
                </Col>
                <Col>
                  <Stack gap={3}>
                    {questions[currentQuestion].answerOptions.map(
                      (answerOption, index) => (
                        <Button key={answerOption.key}
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
      }
      </Container>
      </div>
    );
  } catch (e) {
    return (
      <h3>There has been an error</h3>
    );
  }
}

export default Quiz;

import React, { useEffect, useState } from "react";
import CodeBox from '../components/CodeBox';
import firebase from "../Firebase";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";


const  Quiz = (props) => {
  // state for game play
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [propsCode, setPropsCode] = useState('');
    
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
    setPropsCode(questions[currentQuestion].code);

    console.log("end of collection does update original data: " + questions[currentQuestion].code)
    console.log("end of collection does update propscodeState: " + propsCode)
  }
  
  

  useEffect(() => {
    const col = firebase.firestore().collection('quizzes').doc(props.match.params.id).collection('questions');
    const ref = firebase.firestore().collection('quizzes').doc(props.match.params.id);
    console.log("beginning of useeffect propscodeState: " + propsCode)
    ref.get().then((doc) => {
      if (doc.exists) {
          setQuiz(doc.data());
          setIsLoading(false);
      } else {
        console.log("No such document!");
      }
    });
    const unsubscribe = col.onSnapshot(onCollectionUpdate);
    console.log("end of useeffect propscodeState: " + propsCode)
    return () => unsubscribe()
  }, [propsCode]); // , props.match.params.id
  
  const handleAnswerButtonClick = (isCorrect) => {
    console.log("beginning of onclick handler propscodeState: " + propsCode)
    const nextQuestion = currentQuestion + 1;
    if (isCorrect) {
      setScore(score + 1);
    }
    setPropsCode('set next question here to be:')
   
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setPropsCode(questions[nextQuestion].code)
    } else {
      setShowScore(true);
    }
    console.log("emd of onclick handler" + propsCode)
  };
  
  try {
  return (
    <div>
      <Header />
      <QuizName className="text-center">You are competing the {quiz.quizname} quiz</QuizName>
      <Container >
      { isLoading ? <> 
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
                  <div className="mb-1">
                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                  </div>
                  <div className="mb-2">{questions[currentQuestion].questionText}</div>
                  {propsCode ? <CodeBox code={propsCode}/> : ''}
                </Col>
                <Col>
                  <Stack gap={3} className="m-auto">
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


const QuizName = styled.h4`
  textAlign: 'right';
  padding: 1em;
  
`;
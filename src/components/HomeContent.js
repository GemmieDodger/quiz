import React, { useEffect, useState } from "react";
import firebase from "../Firebase";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const HomeContent = () => {
  const [state, setState] = useState({
    quizzes: [],
  });

  const onCollectionUpdate = (querySnapshot) => {
    const quizzes = [];
    querySnapshot.forEach((doc) => {
      const { quizName } = doc.data();
      quizzes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        quizName,
      });
    });
    setState({ quizzes });
  };

  //check quizzes exists + set state
  useEffect(() => {
    const ref = firebase.firestore().collection("quizzes");
    // console.log(ref.doc());
    ref.get().then((doc) => {
      if (!doc.exists) {
        console.log("No such document!");
      }
    });
    const unsubscribe = ref.onSnapshot(onCollectionUpdate);
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <p className="mt-2 mb-0 text-center">
            You've made it to the QUESTIONSHOP!
          </p>
          <p className="mb-4 text-center">Next step, knowledge!</p>
        </Col>
      </Row>
      <Row className="text-center">
        <h1 className="mb-3">Choose your quiz?</h1> 
        <Link to="/admin"><h6>Create or edit quiz?</h6></Link>
      </Row>
      <Row xs={2} md={3} className="g-4 text-center">
        {state.quizzes.map((quiz) => (
          <div key={quiz.key} className="col-1" data-label="quiz">
            <QuizLink to={`/quiz/${quiz.key}/${quiz.quizName}`}>
              <Card style={{height: 250, width: 250}} className="bg-dark d-flex text-light">
                <Card.Body className="align-items-center d-flex justify-content-center" ><QuizHeader>{quiz.quizName}</QuizHeader></Card.Body>
              </Card>
            </QuizLink>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default HomeContent;

const QuizHeader = styled.h3`
  fontSize: '15px';
  
`;

const QuizLink = styled(Link)`
  textDecoration: 'none';
`;
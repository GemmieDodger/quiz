import React, { useEffect, useState } from "react";
import firebase from "../Firebase";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const Admin = () => {
  const [state, setState] = useState({
    quizzes: [],
  });

  const onCollectionUpdate = (querySnapshot) => {
    const quizzes = [];
    querySnapshot.forEach((doc) => {
      const { quizname } = doc.data();
      quizzes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        quizname,
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
    <>
    <Header/>
    <Container>
      <Row xs={2} md={3} className="g-4 mt-2 text-center">
        <QuizLink to={`/admin/create`}>
              <Card style={{height: 250, width: 250}} className="bg-dark d-flex text-light">
                <Card.Body className="align-items-center d-flex justify-content-center" ><QuizHeader>Create quiz</QuizHeader></Card.Body>
              </Card>
            </QuizLink>
        {state.quizzes.map((quiz) => (
          <div key={quiz.key} className="col-1" data-label="quiz">
            <QuizLink to={`/admin/edit/quiz/${quiz.key}/${quiz.quizname}`}>
              <Card style={{height: 250, width: 250}} className="bg-dark d-flex text-light">
                <Card.Body className="align-items-center d-flex justify-content-center" ><QuizHeader>Edit {quiz.quizname} quiz</QuizHeader></Card.Body>
              </Card>
            </QuizLink>
          </div>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default Admin;

const QuizHeader = styled.h3`
  fontSize: '15px';
  
`;

const QuizLink = styled(Link)`
  textDecoration: 'none';
`;
import React, { useEffect, useState } from "react";
import firebase from "../Firebase";

import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Admin = () => {
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
    <>
    <Header/>
    <Container>
      <Row className="g-4 mt-2 text-center justify-content-center">
        <Col xs={12} md={4}>
        <Link className="text-decoration-none" to={`/admin/create`}>
              <Card style={{height: 250}} className="bg-dark d-flex text-success">
                <Card.Body className="align-items-center d-flex justify-content-center" ><h3 >Create quiz</h3></Card.Body>
              </Card>
            </Link>
        </Col>
        {state.quizzes.map((quiz) => (
          <Col xs={12} md={4}>
          <div key={quiz.key} data-label="quiz">
            <Link className="text-decoration-none" to={`/admin/edit/quiz/${quiz.key}/${quiz.quizName}`}>
              <Card style={{height: 250}} className="bg-dark d-flex text-light">
                <Card.Body className="align-items-center d-flex justify-content-center" ><h3>Edit {quiz.quizName} quiz</h3></Card.Body>
              </Card>
            </Link>
          </div>
          </Col>

        ))}
        </Row>    
    </Container>
    </>
  );
};

export default Admin;


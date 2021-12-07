import React from "react";

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/Header";
import FirebaseAuth from "../firebaseAuth";

const Login = (props) => {

  return (
    <div>
    <Header />
    
      <Container fluid className="p-5 mt-5 bg-dark text-white" style={{maxWidth: '300px'}} data-testid="header">
        
        <Row>
            <Col>
              <FirebaseAuth />
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login;

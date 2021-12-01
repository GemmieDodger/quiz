import React from "react";

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


const Header = (props) => {
  
  return (
    <>
      <Container fluid className="p-5 bg-dark text-white">
        <Row>
          <Col xs={8} sm={10}>
            <Link className="text-decoration-none text-secondary" to="/"><h1>QUESTIONSHOP</h1></Link>
          </Col>
          <Col xs={4} sm={2}>

              <Link to="/">
                <Button className="bg-secondary text-light">Home</Button>
              </Link>
        
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Header;

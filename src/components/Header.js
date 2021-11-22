import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [id, setId] = useState(false);

  useEffect(() => {
    try {
      if (props.match.params.id) {
        setId(true);
      }
    } catch (e) {
      // setId(false);
      // console.log(e);
      console.log('error')
    }
  });

  return (
    <>
      <Container fluid className="p-5 bg-dark text-white">
        <Row>
          <Col xs={8} sm={10}>
            <h1>QUESTIONSHOP</h1>
          </Col>
          <Col xs={4} sm={2}>
            {id ? (
              <Link to="/">
                <Button className="bg-secondary text-light">Home</Button>
              </Link>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;

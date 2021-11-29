import React, { useState } from "react";
import firebase from "../Firebase";

import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";

const Loading = (props) => {
  return (
    <>
      <Row className="bg-dark text-light p-4 m-5">
        <div>Loading Quiz...</div>
      </Row>
    </>
  );
};

export default Loading;

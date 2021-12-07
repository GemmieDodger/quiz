import React from "react";

import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import AddQuestion from "../components/AddQuestion";
import EditQuestions from "../components/EditQuestions";

const EditQuiz = (props) => {

  return (
    <>
      <Header user={props.location.passedProps.user} />
      <SubHeader quizName={props.match.params.quizname} />
      <EditQuestions id={props.match.params.id} />
      <AddQuestion id={props.match.params.id} />
    </>
  );
};

export default EditQuiz;

import React from "react";
import App from '../src/App';
import Header from '../src/components/Header';
import {render, cleanup, fireEvent, screen} from '@testing-library/react'
import firebase from '../src/Firebase';
import Quiz from '../src/views/Quiz';

afterEach(cleanup);

test('renders expected text in render of Quiz', async () => {
  const quizzes = []
  const onCollectionUpdate = (querySnapshot) => {
    
    querySnapshot.forEach((doc) => {
      const { quizName } = doc.data();
      quizzes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        quizName,
      });
    });
    expect(quizzes.length).toBeGreaterThan(0)
  };

const ref = firebase.firestore().collection("quizzes");
ref.get().then((doc) => {
  if (!doc.exists) {
    console.log("No such document!");
  }
});
ref.onSnapshot(onCollectionUpdate);

render(<App />);




  //   const quiz = await screen.getByTestId('quiz');
// console.log(quiz)
//   expect(quiz).toHaveTextContent;
//   expect(quiz).toMatchObject;
})

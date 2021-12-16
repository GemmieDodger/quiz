import React from "react";
import { render, screen } from '@testing-library/react';
import firebase from "../src/Firebase";

test('can reach quiz data from firebase', () => {
    const onCollectionUpdate = (querySnapshot) => {
        const quizzes = []
        expect(quizzes.length).toBe(0)
        querySnapshot.forEach((doc) => {
          const { quizName } = doc.data();
          quizzes.push({
            key: doc.id,
            doc, // DocumentSnapshot
            quizName,
          });
        });
        expect(internalQuizzes.length).toBeGreaterThan(0)
      };

    const ref = firebase.firestore().collection("quizzes");
    ref.get().then((doc) => {
      if (!doc.exists) {
        console.log("No such document!");
      }
    });
    ref.onSnapshot(onCollectionUpdate);
});

test('can reach quiz data from firebase', () => {
  const onCollectionUpdate = (querySnapshot) => {
      const quizzes = []
      expect(quizzes.length).toBe(0)
      querySnapshot.forEach((doc) => {
        const { quizName } = doc.data();
        quizzes.push({
          key: doc.id,
          doc, // DocumentSnapshot
          quizName,
        });
      });

      

      expect(internalQuizzes.length).toBeGreaterThan(0)
    };

  const ref = firebase.firestore().collection("quizzes");
  ref.get().then((doc) => {
    if (!doc.exists) {
      console.log("No such document!");
    }
  });
  ref.onSnapshot(onCollectionUpdate);
});
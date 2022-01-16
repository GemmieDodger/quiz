import React, { useState } from "react";
import App from "../src/App"
import firebase from "../src/Firebase";
const { render, screen } = require("@testing-library/react");
import 'regenerator-runtime';

describe('Firebase integration with app', () => {
  test("Expect render to include quizCards when rendering app.", async () => {
    const fetchPromise = Promise.resolve([{ name: "quizCard" }]);
    jest.spyOn(firebase, "app").mockImplementation(() => ({
      firestore: () => ({
        collection: () => ({
          get: () => fetchPromise
        })
      })
    }));
    let wrapper = render(<App />);
    await fetchPromise;
    wrapper.rerender;
    const quizCards = wrapper.findAllByTestId("quizCard");
    await expect(quizCards).toBeInTheDocument
    await expect(quizCards[0]).toContainHTML;
  });
})

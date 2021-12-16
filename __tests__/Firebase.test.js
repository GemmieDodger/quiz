import React, { useState } from "react";
import App from "../src/App"
import firebase from "../src/Firebase";
const { render, screen } = require("@testing-library/react");
import 'regenerator-runtime';

test("expect render inc. firebase for app", async () => {
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
    await expect(wrapper.findAllByTestId("quizCard")).toHaveReturnedTimes
  });
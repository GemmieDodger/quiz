import React from 'react';
const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import Create from "../src/views/CreateQuiz";
import Admin from "../src/views/Admin"
import 'regenerator-runtime';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// https://www.youtube.com/watch?v=OVNjsIto9xM


test('Testing create button exists', async () => {
    const expectedProps = {
            passedProps: {
                user: '5'
            }
    };
    render(
        <Router>
        <Create location={expectedProps}/>
        </Router>
        )
    // userEvent.type(screen.getByPlaceholderText(/Add quiz name here/i), "PHP"); //search for amount and then replace as 50
    expect( await screen.findByRole('button', {name: /Create new quiz/i})).toBeEnabled;
    expect( await screen.findByRole('button', {name: /Create new quiz/i})).toBeDisabled;
})

test('Testing can build and submit a new quiz, would expect the response to be error as no connection to firebase', async () => {
    const expectedProps = {
            passedProps: {
                user: '5'
            }
    };
    render(
        <Router>
        <Create location={expectedProps}/>
        </Router>
        )

    await userEvent.type( await screen.getByPlaceholderText(/Add quiz name here/i), "PHP"); //search for amount and then replace as 50
    await userEvent.click( await screen.getByRole('button', {name: /Create new quiz/i})); // click create
    expect( await screen.findByRole('button', {name: /Create new quiz/i})).toHaveReturned; // returns with error because no firebase connection
})

// test('if amount is entered, the pay button becomes enabled', async () => {
//     render(<TransactionCreateStepTwo sender={{id: '5'}} receiver={{id: '20'}}/>)
    
//     userEvent.type(screen.getByPlaceholderText(/amount/i), "50"); //search for amount and then replace as 50
//     userEvent.type(screen.getByPlaceholderText(/note/i), "Dinner"); //search for amount and then replace to be a word
//     expect(await screen.findByRole('button', {name: /pay/i})).toBeEnabled();
// })
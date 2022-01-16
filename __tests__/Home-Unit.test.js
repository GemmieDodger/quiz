import App from '../src/App';
import Header from '../src/components/Header';
import React from "react";
import {render, fireEvent, screen} from '@testing-library/react'

describe('Home page',() => {
  test('loads header', async () => {
    render(<App />)
    const header = await screen.getByTestId('header');
    expect(header).toHaveTextContent;
    expect(header).toMatchObject;
  })
})

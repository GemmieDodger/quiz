import React from "react";
import App from '../src/App';
import Header from '../src/components/Header';
import {render, cleanup, fireEvent, screen} from '@testing-library/react'
import Quiz from '../src/views/Quiz';

afterEach(cleanup);

test('renders expected text in render of Quiz', async () => {
  render(<Quiz />);
  const linkElement = await screen.getByText(`QUESTIONSHOP!`);
  expect(linkElement).toHaveTextContent;
})

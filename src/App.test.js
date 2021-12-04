import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';

//THIS IS NOT LI

test('renders learn react link', () => {
  render(<App />);
  screen.debug();
  const linkElement = screen.getByText(/You've made it to the QUESTIONSHOP!/i);
  expect(linkElement).toHaveTextContent;
});

import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders expected text in render of App', () => {
  render(<App />);
  const linkElement = screen.getByText(/You've made it to the QUESTIONSHOP!/i);
  expect(linkElement).toHaveTextContent;
});

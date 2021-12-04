import App from '../src/App';
import Header from '../src/components/Header';
import React from "react";
import {render, fireEvent, screen} from '@testing-library/react'

// https://testing-library.com/docs/react-testing-library/cheatsheet
test('loads header', async () => {
  render(<App />)

  // Click button
  // fireEvent.click(screen.getAllByTestId('editQuestion'))

  // Wait for page to update with query text
  // const quesiton = await screen.
  // const items = await screen.findAllByText(/Item #[0-9]: /)
  // expect(items).toHaveLength(10)


  const header = await screen.getByTestId('header');

  expect(header).toHaveTextContent;
  expect(header).toMatchObject;
})
import EditQuestions from '../src/components/EditQuestions';
import EditQuiz from '../src/views/EditQuiz'
describe('Addition', () => {
    it(''), () => {
        
    }
    it('knows that 2 and 2 make 4', () => {
      expect(2 + 2).toBe(4);
    });
  });

  // Use React testing library for components?

  import {render, fireEvent, screen} from '@testing-library/react'
// https://testing-library.com/docs/react-testing-library/cheatsheet
test('loads items eventually', async () => {
  render(<Quiz />)

  // Click button
  fireEvent.click(screen.getAllByTestId('editQuestion'))

  // Wait for page to update with query text
  const quesiton = await screen.
  const items = await screen.findAllByText(/Item #[0-9]: /)
  expect(items).toHaveLength(10)


  const questions = await screen.getAllByTestId('editQuestion');

  expect(questions)
})
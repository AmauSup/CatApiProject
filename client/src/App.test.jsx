import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Cat API Project title', () => {
  render(<App />);
  expect(screen.getByText(/Cat API Project/i)).toBeInTheDocument();
});

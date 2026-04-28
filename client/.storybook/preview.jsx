
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../src/services/AuthContext';

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <AuthProvider>
        <Story />
      </AuthProvider>
    </MemoryRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
};

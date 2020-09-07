import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@contexts/theme';
import { AxiosProvider } from '@contexts/axios';

import Pages from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <AxiosProvider>
        <ThemeProvider>
          <Pages />
        </ThemeProvider>
      </AxiosProvider>
    </Router>
  );
};

export default App;

import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './Page/ErrorPage';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

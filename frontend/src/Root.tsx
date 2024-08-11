import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './Page/ErrorPage';
import { About } from './Page/About';
import { HomePage } from './Components/homePage/HomePage';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />}/>
          <Route path='about' element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

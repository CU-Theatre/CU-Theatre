import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './Components/errorPage';
import { AboutPage } from './Components/aboutPage';
import { HomePage } from './Components/homePage/HomePage';
import { ContactPage } from './Components/contactPage/ContactPage';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />}/>
          <Route path='about' element={<AboutPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

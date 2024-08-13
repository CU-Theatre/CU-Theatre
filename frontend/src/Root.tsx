import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './Components/errorPage';
import { AboutPage } from './Components/aboutPage';
import { HomePage } from './Components/homePage/HomePage';
import { TimeTable } from './Components/timetablePage';

export const Root: React.FC = () => {
  return (
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />}/>
          <Route path='about' element={<AboutPage />} />
          <Route path='timetable' element={<TimeTable />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
  );
}

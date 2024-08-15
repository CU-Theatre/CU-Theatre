import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './Components/errorPage';
import { AboutPage } from './Components/aboutPage';
import { HomePage } from './Components/homePage/HomePage';
import { TimeTable } from './Components/timetablePage';
import { Loader } from './Components/general_components/Loader';
import { ContactPage } from './Components/contactPage/ContactPage';
import { YourAccount } from './Components/general_components/personalAccount';

export const Root: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />}/>
          <Route path='about' element={<AboutPage />} />
          <Route path='timetable' element={<TimeTable />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='your-account' element={<YourAccount />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

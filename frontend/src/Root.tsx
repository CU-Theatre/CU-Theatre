import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './Components/errorPage';
import { AboutPage } from './Components/aboutPage';
import { HomePage } from './Components/homePage/HomePage';
import { TimeTable } from './Components/timetablePage';
import { ContactPage } from './Components/contactPage/ContactPage';
import { LogInPage } from './Components/logInPage';
import { YourAccount } from './Components/general_components/personalAccount';
import { OurCoursesPage } from './Components/OurCoursesPage/OurCoursesPage';
import { SubscribedUsersTable } from './Components/general_components/EventSubscr';
import { SubscribeForEvents } from './Components/general_components/SubscribeForEvents';
import { ClassesPage } from './Components/classesPage';
import { EmergencyContact } from './Components/general_components/EmergencyContact';

export const Root: React.FC = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />}/>
            <Route path='about' element={<AboutPage />} />
            <Route path='timetable' element={<TimeTable />} />
            <Route path='contact' element={<ContactPage />} />
            <Route path='log-in' element={<LogInPage />} />
            <Route path='your-account' element={<YourAccount />} />
            <Route path='our-courses' element={<OurCoursesPage />} />
            <Route path='users-table' element={<SubscribedUsersTable />}/>
            <Route path='subscribe-for-event' element={<SubscribeForEvents />} />
            <Route path='classes' element={<ClassesPage />} />
            <Route path='emergency-contacts' element={<EmergencyContact />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
    </>
  );
}

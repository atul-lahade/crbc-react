import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import AdminDashboard from './component/AdminDashboard';
import ApplicantDashboard from './component/ApplicantDashboard';
import Applicants from './component/Applicants';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/applicant-dashboard" element={<ApplicantDashboard userName={''} userId={0} applicantId={0} />} />
        <Route path="/admin-all-applicants" element={<Applicants />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

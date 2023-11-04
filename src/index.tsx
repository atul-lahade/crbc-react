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
import Request from './component/Request';


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
        <Route path="/applicant-dashboard" element={<ApplicantDashboard />} />
        <Route path="/admin-all-applicants" element={<Applicants />} />
        <Route path="/admin-all-requests" element={<Request />} />
        <Route path="/applicant-all-requests" element={<Request />} />
        <Route path="/admin-new-requests" element={<Request />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

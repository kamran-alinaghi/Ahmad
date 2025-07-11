import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/Login';
import SignupPage from './components/SignUp/SignupPage';
import ProjectSelection from './components/ProjectSelection/ProjectSelection';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user.email ? <LoginPage /> : <Navigate to="/projects" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/projects" element={user.email ? <ProjectSelection /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
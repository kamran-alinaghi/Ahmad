import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/Login';
import SignupPage from './components/SignUp/SignupPage';
import ProjectSelection from './components/ProjectSelection/ProjectSelection';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/store';
import { restoreProjectsToRedux, restoreUserToRedux } from './utils/sessionRestore';

const App: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const restoreSession = async () => {
      const userRestored = await restoreUserToRedux(dispatch);
      if (userRestored) {
        await restoreProjectsToRedux(dispatch);
      }
    };

    restoreSession();
  }, [dispatch]);



  
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
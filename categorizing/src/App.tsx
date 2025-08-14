import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/Login';
import SignupPage from './components/SignUp/SignupPage';
import ProjectSelection from './components/ProjectSelection/ProjectSelection';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebaseConfig';
import { logout, setUser } from './redux/userSlice';

const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userInAuth) => {
      if (userInAuth) {
        dispatch(setUser({
          email: userInAuth.email!,
          name: userInAuth.displayName,
          photoURL: userInAuth.photoURL,
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
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
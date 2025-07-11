import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    dispatch(setUser({ email }));
    navigate('/projects');
  };

  const handleGoogleLogin = () => {
    dispatch(setUser({ email: 'googleuser@example.com' }));
    navigate('/projects');
  };

  return (
    <AuthForm
      isSignup={false}
      onSubmit={handleLogin}
      onGoogleLogin={handleGoogleLogin}
      switchForm={() => navigate('/signup')}
    />
  );
};

export default LoginPage;

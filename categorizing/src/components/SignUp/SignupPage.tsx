import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (email: string, password: string) => {
    dispatch(setUser({ email }));
    navigate('/projects');
  };

  const handleGoogleLogin = () => {
    dispatch(setUser({ email: 'googleuser@example.com' }));
    navigate('/projects');
  };

  return (
    <AuthForm
      isSignup={true}
      onSubmit={handleSignup}
      onGoogleLogin={handleGoogleLogin}
      switchForm={() => navigate('/')}
    />
  );
};

export default SignupPage;
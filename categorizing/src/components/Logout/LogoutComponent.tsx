import React from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';
import { auth } from '../../utils/firebaseConfig';
import { logout } from '../../redux/userSlice';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out');
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;

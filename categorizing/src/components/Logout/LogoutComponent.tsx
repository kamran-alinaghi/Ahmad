import React from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    <button onClick={handleLogout} style={{ marginTop: '2rem' }}>
      Logout
    </button>
  );
};

export default LogoutButton;

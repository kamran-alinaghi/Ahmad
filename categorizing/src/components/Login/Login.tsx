import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../utils/firebaseConfig';
import { setUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Optional: implement email/password auth here later
    console.warn('Email/password login not implemented.');
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch(
        setUser({
          email: user.email!,
          name: user.displayName,
          photoURL: user.photoURL,
        })
      );
      navigate('/projects');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      alert('Google authentication failed.');
    }
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

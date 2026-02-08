import { signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '../../utils/firebaseConfig';
import { setUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import { collection, getDocs } from 'firebase/firestore';
import { setProjects, type Project } from '../../redux/projectSlice';
import type { TableData } from '../DynamicTableBuilder/types';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (/* email: string, password: string */) => {
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

      // Storing projects in redux store
      try {
        const snapshot = await getDocs(collection(db, 'projects'));
        const list = snapshot.docs.map((doc) => {
          const tableRead = doc.data().table;
          var tableContent = {columns:[''],rows:[{title:'',values:[]}]} as TableData
          if (tableRead !== undefined) {
            tableContent = doc.data().table as TableData;
          }
          return {
            id: doc.id,
            name: doc.data().name,
            table: tableContent,
          } as Project
        });
        dispatch(setProjects(list));
      }
      catch (e) {
        alert(e);
      }

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

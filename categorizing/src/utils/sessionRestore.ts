// sessionRestore.ts
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, logout } from '../redux/userSlice';
import { setProjects, clearProjects } from '../redux/projectSlice';
import { collection, getDocs } from 'firebase/firestore';
import type { AppDispatch } from '../redux/store';
import { auth, db } from './firebaseConfig';

export const restoreUserToRedux = (dispatch: AppDispatch): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          email: user.email!,
          name: user.displayName,
          photoURL: user.photoURL,
        }));
        resolve(true);
      } else {
        dispatch(logout());
        resolve(false);
      }

      unsubscribe(); // only run once
    });
  });
};

export const restoreProjectsToRedux = async (dispatch: AppDispatch): Promise<void> => {
  try {
    const snapshot = await getDocs(collection(db, 'projects'));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    dispatch(setProjects(list));
  } catch (error) {
    console.error('Error restoring projects:', error);
    dispatch(clearProjects());
  }
};

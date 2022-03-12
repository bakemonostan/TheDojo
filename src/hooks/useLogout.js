import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { projectAuth, projectFirestore } from '../firebase/config';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logOut = async () => {
    setError(null);
    setIsPending(true);

    // * Sign user Out
    try {
      // * Update online status
      const { uid } = user;
      await projectFirestore
        .collection('users')
        .doc(uid)
        .update({ online: false });
      setIsPending(false);

      await projectAuth.signOut();
      //* disptach logout action
      dispatch({ type: 'LOGOUT' });
      //
      // * Update States
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logOut, error, isPending };
};

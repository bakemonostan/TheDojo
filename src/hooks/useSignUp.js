import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //* Sign Up the User
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // * Dspatch login action

      if (!res) {
        throw new Error('Could not complete sign up process');
      }

      // * Add displayname
      await res.user.updateProfile({ displayName });

      //* dispatch ogin actions
      dispatch({ type: 'LOGIN', payload: res.user });
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

  return { error, isPending, signup };
};

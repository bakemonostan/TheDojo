import { useState, useEffect } from 'react';
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      //* Sign Up the User
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error('Could not complete sign up process');
      }

      // * upload user thumbnail
      // * Create a path for the image in the user's bucket
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);

      // get the image url
      const imgUrl = await img.ref.getDownloadURL();

      // * Add displayname
      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      // * Create a user Document(watch this lesson again)
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      //* dispatch login actions
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

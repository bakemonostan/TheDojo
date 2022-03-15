// import { useCollection } from "./useCollection";
import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collectionName, id) => {
  // collection name can be things like, users, projects, comments etc
  const [document, setDocument] = useState(undefined);
  const [error, setError] = useState(null);

  // set up realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collectionName).doc(id);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({
            // spread out the different existing properties first
            ...snapshot.data(),
            id: snapshot.id,
          });
          setError(null);
        } else {
          setError('Cannot find document');
        }
      },
      (error) => {
        console.log(error.message);
        setError('failed to get Document');
      }
    );
    return () => unsubscribe();
  }, [collectionName, id]);
  return { document, error };
};

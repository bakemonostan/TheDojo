import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const fireStoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, error: false, success: false };
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: null,
        error: null,
        success: true,
      };
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        error: true,
        success: false,
      };
    default:
      return state;
  }
};

export const useFireStore = (collection) => {
  const [response, disptach] = useReducer(fireStoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // get collection
  const ref = projectFirestore.collection(collection);

  // check isCancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      disptach(action);
    }
  };

  // * Add document to Collection
  const createdAt = timestamp.fromDate(new Date());

  const addDocument = async (doc) => {
    disptach({ type: 'IS_PENDING' });

    try {
      const addedDocument = await ref.add({ ...doc, createdAt });

      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  // * Delete document from Collection
  const deleteDocument = async (id) => {
    disptach({ type: 'IS_PENDING' });
    try {
      await ref.doc(id).delete();

      dispatchIfNotCancelled({
        type: 'DELETED_DOCUMENT',
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};

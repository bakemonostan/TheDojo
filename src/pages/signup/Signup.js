// Styles
import { useState } from 'react';
import { useSignUp } from '../../hooks/useSignUp';
import './Signup.css';

// states

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(undefined);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { error, isPending, signup } = useSignUp();

  const handleFileChnage = (e) => {
    setThumbnail(null);
    // * select only one file
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('Please Select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Please Select an Image file');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Image selected must be less tha 1000kb');
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email</span>
        <input
          required
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Display Name</span>
        <input
          required
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile Avatar</span>
        <input required type='file' onChange={handleFileChnage} />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {isPending && (
        <button className='btn' disabled>
          Loading
        </button>
      )}
      {!isPending && <button className='btn'>Sign up</button>}

      {error && <div className='error'>{error}</div>}
    </form>
  );
}

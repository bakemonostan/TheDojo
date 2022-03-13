import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

// styles
import './Navbar.css';

import Temple from '../assets/temple.svg';
import { useLogout } from '../hooks/useLogout';

function Navbar() {
  const { logOut, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='dojo-logo' />
          <span>The Dojo</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to='login'>Login</Link>
            </li>
            <li>
              <Link to='signup'>Sign up</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button
                className='btn'
                onClick={logOut}
                element={<Navigate to='/login' />}
              >
                Sign out
              </button>
            )}
            {isPending && (
              <button className='btn' disabled>
                Signing Out...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;

import { Link } from 'react-router-dom';

// styles
import './Navbar.css';

import Temple from '../assets/temple.svg';
import { useLogout } from '../hooks/useLogout';

function Navbar() {
  const { logOut, isPending } = useLogout();
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='dojo-logo' />
          <span>The Dojo</span>
        </li>
        <li>
          <Link to='login'>Login</Link>
        </li>
        <li>
          <Link to='signup'>Signup</Link>
        </li>
        <li>
          {!isPending && (
            <button className='btn' onClick={logOut}>
              Signout
            </button>
          )}
          {isPending && (
            <button className='btn' disabled>
              Signing Out...
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

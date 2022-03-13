// * styles
import './OnlineUsers.css';

// * Custom hooks
import { useCollection } from '../hooks/useCollection';

// * Components
import Avatar from './Avatar';

export default function OnlineUsers() {
  // ! do not forget to pass the collection you want to access

  const { error, documents } = useCollection('users');

  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {error && <div className='error'>{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className='user-list-item'>
            {/* show if user is online */}
            {user.online && <span className='online-user'></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}

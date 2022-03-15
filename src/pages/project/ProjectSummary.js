import Avatar from '../../components/Avatar';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFireStore } from '../../hooks/useFireStore';
import { useNavigate } from 'react-router-dom';

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFireStore('projects');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = (e) => {
    deleteDocument(project.id);
    navigate('/');
  };
  return (
    <div>
      <div className='project-summary'>
        <h2 className='project-title'>{project.name}</h2>
        <p className='due-date'>
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p>Created by {project.createdBy.displayName}</p>
        <Avatar src={project.createdBy.photoURL} />
        <p className='details'>{project.details}</p>
        <h4>Project is Assigned to:</h4>
        <div className='assigned-users'>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
        {user.uid === project.createdBy.id && (
          <button className='btn' onClick={handleClick}>
            Mark as complete
          </button>
        )}
      </div>
    </div>
  );
}

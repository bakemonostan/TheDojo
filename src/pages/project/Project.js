import './Project.css';
import { useParams } from 'react-router-dom';

import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';

export default function Project() {
  const { id } = useParams();
  const { error, document } = useDocument('projects', id);
  if (error) {
    return <div className='error'>{error}</div>; // if there's and error, don't bother wth trying to execute the other codes, thats the point of using return
  }

  // loading state
  if (!document) {
    return <div>Loading...</div>;
  }
  return (
    <div className='project-details'>
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
}

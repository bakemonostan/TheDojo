import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFireStore } from '../../hooks/useFireStore';

// * Styles
import './Create.css';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

function Create() {
  const { documents } = useCollection('users');

  const [users, setUsers] = useState([]);

  const { user } = useAuthContext();
  const { addDocument, response } = useFireStore('projects');

  let navigate = useNavigate();

  useEffect(() => {
    // * Check if we have a document/ documents in the collection
    if (documents) {
      // map through and return the user object as the value, and user dispayname as the label
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });

      // setUsers() to the options
      setUsers(options);
    }
  }, [documents]);

  // Form field Values
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please Select a Catergory');
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError('Please ASSIGN the project to at least one user');
      return;
    }

    // * Saving user data to the project i.e The user who created the project
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    // create a projet object that would be stored to the firebase collection
    const projects = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(projects);
    if (!response.error) {
      navigate('/');
    }
  };

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create New Project</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            type='text'
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            required
          ></textarea>
        </label>
        <label>
          <span>Set Due Date:</span>
          <input
            type='date'
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
          />
        </label>
        <label>
          <span>Project Category</span>
          <Select
            options={categories}
            onChange={(options) => setCategory(options)}
          />
        </label>
        <label>
          <span>Assign to :</span>
          <Select
            options={users}
            onChange={(options) => setAssignedUsers(options)}
            isMulti
          />
        </label>

        <button className='btn'>Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
}

export default Create;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// * Custom context hook
import { useAuthContext } from './hooks/useAuthContext';

// * Pages
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';

// * Styles
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          <Sidebar />
          <div className='container'>
            <Navbar />
            <Routes>
              {user && <Route exact path='/' element={<Dashboard />} />}
              {!user && <Route path='/' element={<Navigate to='/login' />} />}

              {user && <Route path='/login' element={<Dashboard />} />}
              {!user && <Route path='/login' element={<Login />} />}

              {user && <Route path='/create' element={<Create />} />}
              {!user && (
                <Route path='/create' element={<Navigate to='/login' />} />
              )}

              {user && <Route path='/signup' element={<Dashboard />} />}
              {!user && <Route path='/signup' element={<Signup />} />}

              {user && <Route path='/projects' element={<Project />} />}
              {!user && (
                <Route path='/projects' element={<Navigate to='/login' />} />
              )}

              {user && <Route path='/projects/:id' element={<Project />} />}
              {!user && <Route path='/projects/:id' element={<Login />} />}
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

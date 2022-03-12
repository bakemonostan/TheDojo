import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar />
        <div className='container'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/project/:id' element={<Project />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

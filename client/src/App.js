//import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Signup} from './pages';
import React from 'react';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import EditAccount from './pages/EditAccount';
import UserContext from '../src/context/UserContext';

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/edit-account" element={<EditAccount />} />
        </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import Feed from './feed/Feed';
import Navbar from './navbar/Navbar';
import { useUserContext } from './hooks/useUserContext';
import StatusComments from './status_comments/StatusComments';

function App() {
  const { state } = useUserContext();
  const user = state.user;
  
  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar/>}
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={<Login/>}
            />
            <Route 
              path='/register'
              element={<Register/>}
              />
            <Route
              path='/feed'
              element={<Feed/>}
            />
            <Route
              path='/comments/:id'
              element={<StatusComments/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import Feed from './feed/Feed';
import Navbar from './navbar/Navbar';
import { useUserContext } from './hooks/useUserContext';
import StatusComments from './status_comments/StatusComments';
import { LOGIN } from './contexts/UserContext';
import Profile from './profile/Profile';

function App() {
  const { state } = useUserContext();
  const user = state.user;
  
  const { dispatch } = useUserContext();

  useEffect(() => {
    const getUser = async (username: string) => {
      const body = {username: username};
      
      const response = await fetch('http://localhost:4000/users/getWithUsername', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      if (response.ok){
        dispatch({type: LOGIN, payload: json});
      }
    }
    
    let userStr = localStorage.getItem('user');
    if (userStr){
      let user = JSON.parse(userStr);
      getUser(user.username);
    }
  }, [])

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
            <Route
              path='/profile/:username'
              element={<Profile/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

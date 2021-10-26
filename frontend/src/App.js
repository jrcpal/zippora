import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";

import Navigation from "./Components/Navigation"
import Routes from "./Components/Routes"
import DatabaseApi from './apiDatabase.js'
import Loading from './Components/Loading'



function App() {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

  //setUpdateSuccess: parent function to handle state when user change submits to their setPreferencesForm are successful
  const [updateSuccess, setUpdateSuccess] = useState(false)
  

  // if token in local storage, logs in
  useEffect(function checkForToken() {
    async function _checkForToken() {
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
      } else {
        setIsAuthenticating(false);
      }
    }

    _checkForToken();
  }, []);

  // sets token in DatabaseApi, gets and sets current user
  useEffect(
    function storeTokenAndSetUser() {
      async function _storeTokenAndSetUser() {
        try {
          DatabaseApi.token = token;
          const { username } = jsonwebtoken.decode(token);
          const user = await DatabaseApi.getUser(username);
          setCurrentUser(user);
        } catch {
          console.error("INVALID TOKEN RECEIVED.");
          logout();
        } finally {
          setIsAuthenticating(false);
        }
      }

      if (token) _storeTokenAndSetUser();
    },
    [token, updateSuccess]
  );

  // signUp: registers user with API and logs in
  async function signUp(newUser) {
    const token = await DatabaseApi.signUp(newUser);
    setToken(token);
    localStorage.setItem("token", token);
    history.push("/");
  }

  // login: authenticates user with Database API and logs in
  async function login(loginCredentials) {
    const token = await DatabaseApi.login(loginCredentials);
    setToken(token);
    localStorage.setItem("token", token);
    history.push("/");
  }

  // logout: clears localStorage token, DatabaseApi token, and current user state
  function logout() {
    setToken("");
    DatabaseApi.token = "";
    localStorage.removeItem("token");
    setCurrentUser({});
  }

  // updateUser: updates user with Database, sets currentUser to updated user
  async function updateUser(updateData) {
    const user = await DatabaseApi.updateUser(updateData);
    setCurrentUser(user);
    //history.push("/");
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation currentUser={currentUser} logout={logout}/>
        <h2>Zippora</h2>
        {!isAuthenticating ? (
          <>
          <Routes
            login={login}
            signUp={signUp}
            currentUser={currentUser} 
            updateUser={updateUser}
            setUpdateSuccess={setUpdateSuccess}
          />
          </>
        ) : (
          <Loading />
        )}
        </BrowserRouter>
    </div>

  );
}

export default App;

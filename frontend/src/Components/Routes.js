import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./Homepage"
import Products from "./Products"
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile"

/** Directs user to correct endpoint
 *    props:
 *      - signUp: parent function
 *      - login: parent function
 *      - updateUser: parent function
 *      - setUpdateSuccess: parent function
 *
 *   App -> Routes -> { Homepage, Login, Signup, Products, Profile }
 */

function Routes({currentUser, login, signUp, updateUser, setUpdateSuccess}) {

  const isLoggedIn = !!currentUser.username;

  return (

    <div className="Routes">
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/products" /> : <Homepage />}
        </Route>
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login login={login} />}
        </Route>
        <Route exact path="/signup">
          {isLoggedIn ? <Redirect to="/" /> : <Signup signUp={signUp} />}
        </Route>
        <Route exact path="/products">
          {isLoggedIn ? <Products currentUser={currentUser} updateUser={updateUser} setUpdateSuccess={setUpdateSuccess}/> : <Redirect to="/" />}
        </Route>
        <Route exact path="/profile">
          {isLoggedIn ? (
            <Profile currentUser={currentUser} updateUser={updateUser} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>

  );
}

export default Routes;

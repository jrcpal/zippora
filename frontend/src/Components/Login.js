import UserForm from "./UserForm";

/** Login: Renders Login form and handles login.
 *    props:
 *      - login: parent function
 *
 *    Routes -> Login -> UserForm
 */


function Login({login}) {

  const fields = ["username", "password"];

  return (
    <div className="Login">
      <p>Login to view your products</p>
      <UserForm  submit={login} fields={fields} />
    </div>
  )
}

export default Login
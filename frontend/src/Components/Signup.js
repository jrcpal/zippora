import UserForm from "./UserForm";

/** Signup: Renders Login form and handles login.
 *    props:
 *      - signUp: parent function
 *
 *    Routes -> Signup -> UserForm
 */
function Signup({ signUp }) {
  const fields = ["username", "password"];

  return (
    <div className="Signup">
      <p>Signup to set your preferences and view your favorite Sephora products</p>
      <UserForm submit={signUp} fields={fields} />
    </div>
  
  )
}

export default Signup;




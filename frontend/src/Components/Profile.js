import { useState } from "react";
import Alert from "./Alert";
//import "./Profile.css";

/** Profile: renders form to update user password
 *    props: 
 *      - currentUser: { username }
 *      - updateUser: parent function
 * 
 *    states:
 *      - formData: { username }
 *      - errors: ["error message", ...]
 * 
 *    Routes -> Profile
 */
function Profile({ currentUser, updateUser }) {
  const [formData, setFormData] = useState({
    username: currentUser.username
  });
  const [errors, setErrors] = useState([]);

  // handleChange: updates state on change
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  }

  // handleSubmit: calls parent function on submit, catches errors
  // and updates state
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await updateUser(formData);
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="Profile">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          readOnly={false}
          id="username"
          name="username"
          value={formData.username}
        ></input>
        <label htmlFor="password">Enter new password</label>
        <input
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          autoComplete="off"
        ></input>
        {errors.length > 0
          ? errors.map((error, i) => <Alert error={error} key={i} />)
          : ""}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Profile;

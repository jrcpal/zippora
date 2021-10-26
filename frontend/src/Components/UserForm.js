import { useState } from "react";
import Alert from "./Alert";

import "./UserForm.css";


/** UserForm: controlled component that renders form and calls parent function
 *  on submit.
 *    props:
 *      - submit: parent function
 *      - fields: ["username", "password", ...]
 *
 *    states:
 *      - formData: { username, password, ... }
 *      - errors: ["error message", ...]
 *
 *    { Login, Signup } -> UserForm -> Alert
 */
function UserForm({ submit, fields }) {
  const [formData, setFormData] = useState({});
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
      await submit(formData);
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <form className="UserForm" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field}>
          <label htmlFor={field}>
            {field}
          </label>
          <input
            type={field === "password" ? field : "text"}
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            autoComplete={field === "password" ? "off" : ""}
          ></input>
        </div>
      ))}
      {errors.length > 0
        ? errors.map((error, i) => <Alert error={error} key={i} />)
        : ""}
      <button>Submit</button>
    </form>
    
  );
}

export default UserForm;

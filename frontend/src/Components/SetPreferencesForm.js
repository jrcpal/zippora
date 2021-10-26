import { useState } from "react";
import Alert from "./Alert";

/** SetPreferencesForm: controlled component that renders form and calls parent function
 *  on submit.
 *    props:
 *      - submit: parent function
 *      - checkboxes: ["new", "organic", "sale"]
 *
 *    states:
 *      - formData: { new, organic, sale }
 *      - errors: ["error message", ...]
 *
 *    { Preferences } -> SetPreferencesForm -> Alert
 */
function SetPreferencesForm({ fields, submit, currentUser, setUpdateSuccess}) {
  const [formData, setFormData] = useState({
    username: currentUser.username
  });
  const [errors, setErrors] = useState([]);
  const [fieldData, setFieldData] = useState({is_new: currentUser.isNew, is_organic: currentUser.isOrganic, on_sale: currentUser.onSale})

//use a useEffect to pull checkbox values from the database
//set setFormData with the values
  
  // handleChange: updates state on change
  function handleChange(evt) {
    //let value = evt.target.checked
    const { name } = evt.target;
    
    setFieldData((oldData) => ({
      ...oldData,
      [name]: !fieldData[name],
    }));
  }


  // handleSubmit: calls parent function on submit, catches errors
  // and updates state
  async function handleSubmit(evt) {
    //evt.preventDefault();
    try {
      await submit({...formData, ...fieldData});
      setUpdateSuccess(true)
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <form className="SetPreferencesForm" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field}>
          <label htmlFor={field}>
            {field}
          </label>
          <input
            type="checkbox"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            checked={field === "is_new" ? fieldData.is_new : field === "is_organic" ? fieldData.is_organic : fieldData.on_sale }
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

export default SetPreferencesForm;

//import { useState } from "react";
import SetPreferencesForm from "./SetPreferencesForm";

/** SetPreferences: Renders user preferences form and handles changes to user preferences.
 *    props: 
 *      - preferences: from SetPreferencesForm
 *      - currentUser: { username }
 *      - updateUser: parent function
 *      - setUpdateSuccess: parent function to handle state when user changes to their preferences form are successful
 *    states:
 *      - formData: { username, is_new, is_organic, on_sale }
 *      - errors: ["error message", ...]
 *
 *    Routes -> SetPreferences -> SetPreferencesForm
 */


function SetPreferences({currentUser, updateUser, setUpdateSuccess }) {

  const fields = ["is_new", "is_organic", "on_sale"];

  return (
    <div className="SetPreferences">
      <p>Show products that are:</p>
      <SetPreferencesForm  currentUser={currentUser} submit={updateUser} fields={fields} setUpdateSuccess={setUpdateSuccess} />
    </div>
  )
}

export default SetPreferences
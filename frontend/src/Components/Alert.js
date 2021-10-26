/** Alert: displays errors
 *    props:
 *      - error: "error"
 * 
 *    { Login, Signup } -> Alert
 */

function Alert({error}) {
  return (
  <div className="Alert">
    <p>{error}</p>
  </div>
  )
}

export default Alert;

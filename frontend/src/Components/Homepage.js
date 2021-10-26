import { Link } from "react-router-dom";

/** Displays login/signup or welcome page.
 *
 *    props:
 *       - currentUser: { username }
 */

function Homepage() {
  return (
    <div className="Homepage">
      <p>Only your favorite makeup products from Sephora.</p>
      <div>
          <Link to="/login">Login</Link> /
          <Link to="/signup">Sign up</Link>
        </div>
    </div>
  );
}

export default Homepage;

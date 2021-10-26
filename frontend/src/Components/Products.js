import SetPreferences from "./SetPreferences";
import FaceProducts from "./FaceProducts"
import EyeProducts from "./EyeProducts"
import LipProducts from "./LipProducts"

/** Displays users preferences and products
 *
 *    props:
 *       - currentUser: { username }
 *       - updateUser
 *       - setUpdateSuccess
 * 
 */

function Products({ currentUser, updateUser, setUpdateSuccess }){


return (
  <div className="Products">
    <>
    <h4>Only the products you want from Sephora</h4>
    <p>Welcome back, {currentUser.username}</p>
    <SetPreferences currentUser={currentUser} updateUser={updateUser} setUpdateSuccess={setUpdateSuccess}/>
    <FaceProducts currentUser={currentUser}/>
    <EyeProducts currentUser={currentUser}/>
    <LipProducts currentUser={currentUser}/>
    </>
  </div>
)
}


export default Products;

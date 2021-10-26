
import { useEffect, useState } from "react";
import Carousel from "./Carousel"
import SephoraApi from "../apiSephora"
import Loading from "./Loading"

/** Displays lip products from Sephora. Takes user preferences to filter product results. 
 *
 *    props:
 *       - currentUser: { username, is_new, is_organic, on_sale }
 */

function LipProducts({ currentUser }) {
  console.debug("LipProducts component rendered.");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  
  // gets all products on mount
  useEffect(function getInitialCategory() {
    const _getInitialCategory = async function () {
      await getFilteredProducts()
      setIsLoading(false);
    };
    _getInitialCategory();
  }, []);
      
      
      async function getFilteredProducts() {
        const products = await SephoraApi.getLipProducts();
        let filteredProducts;

          //condition where user selects no filter
          if (!currentUser.isNew && !currentUser.isOrganic && !currentUser.onSale ) {
            filteredProducts = products
          }
          //condition where user only selects new
          else if (currentUser.isNew && !currentUser.isOrganic && !currentUser.onSale ) {
            filteredProducts = products.filter((product) => product.currentSku.isNew) 
          }
          //condition where user only selects organic
          else if (!currentUser.isNew && currentUser.isOrganic && !currentUser.onSale ) {
            filteredProducts = products.filter((product) => product.currentSku.isOrganic) 
          }
          //condition where user only selects sale
          else if (!currentUser.isNew && !currentUser.isOrganic && currentUser.onSale ) {
            filteredProducts = products.filter((product) => product.currentSku.salePrice) 
          }
      
          //condition where user selects new + organic
          else if (currentUser.isNew && currentUser.isOrganic && !currentUser.onSale ) {
            filteredProducts = products.filter((product) => product.currentSku.isNew && product.currentSku.isOrganic) 
          }
          //condition where user selects new + sale
          else if (currentUser.isNew && !currentUser.isOrganic && currentUser.onSale ) {
            filteredProducts = products.filter((product) => product.currentSku.isNew && product.currentSku.salePrice) 
          }
      
          //condition where user selects organic + sale
          else if (!currentUser.isNew && currentUser.isOrganic && currentUser.onSale ) {
            filteredProducts = products.filter((product) => product.currentSku.isOrganic && product.currentSku.salePrice) 
          }
          //condition where user selects new + organic + sale
          else if (currentUser.isNew && currentUser.isOrganic && currentUser.onSale ) {
            filteredProducts = products.filter((product) => product.currentSku.isNew && product.currentSku.isOrganic && product.currentSku.salePrice) 
          }
          //default non-filtered case
          else { 
            filteredProducts = products 
          }
          setProducts(filteredProducts);
      }

  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="LipProducts">
      {products.length === 0 ? <p>No lip products found, please check your preferences</p> : <Carousel products={products}/>}
    </div>
  )
}


export default LipProducts;

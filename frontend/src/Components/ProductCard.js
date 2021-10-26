import "./ProductCard.css"

/** 
 * Displays card for each product in carousel
 */

function ProductCard({product}) {
  return (
    <div className="ProductCard">
      <>
      <p>{product.displayName}</p>
      <img src={product.image250} alt=""/>
      <p>{product.brandName}</p>
      <p>{product.currentSku.listPrice}</p>
      </>
    </div>
  )
}


export default ProductCard
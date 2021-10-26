//would have liked to have used a single function on all product pages instead of having one listed in each page


import SephoraApi from "../apiSephora"


async function getFilteredProducts({currentUser}) {
  const products = await SephoraApi.getFaceProducts();
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
      filteredProducts = products.filter((product) => product.currentSku.onSale) 
    }

    //condition where user selects new + organic
    else if (currentUser.isNew && currentUser.isOrganic && !currentUser.onSale ) {
      filteredProducts = products.filter((product) => product.currentSku.isNew && product.currentSku.isOrganic) 
    }
    //condition where user selects new + sale
    else if (currentUser.isNew && !currentUser.isOrganic && currentUser.onSale ) {
      filteredProducts = products.filter((product) => product.currentSku.isNew && product.currentSku.onSale) 
    }

    //condition where user selects organic + sale
    else if (!currentUser.isNew && currentUser.isOrganic && currentUser.onSale ) {
      filteredProducts = products.filter((product) => product.currentSku.isOrganic && product.currentSku.onSale) 
    }
    //condition where user selects new + organic + sale
    else if (currentUser.isNew && currentUser.isOrganic && currentUser.onSale ) {
      filteredProducts = products.filter((product) => product.currentSku.isNew && product.currentSku.isOrganic && product.currentSku.salePrice) 
    }
    //default non-filtered case
    else { 
      filteredProducts = products 
    }
    return filteredProducts
}

//export default getFilteredProducts;

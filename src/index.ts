import { mockProductData } from './mockProductApi';

export interface Product {
  productId: string;
  name: string;
  price: string;
}

// This simple conversion stands in for what would be a much more robust validation/conversion
// which would potentially have to handle different currencies and floats
function convertPriceStringToNumber(price: string) {
  if (price) {
    return parseInt(price);
  }
  return;
}

function getProducts(min: number, max: number): Product[] | undefined {
  if (mockProductData) {
    for (let product of mockProductData) {
      let parsedProduct = {
        productId: product.productId,
        name: product.name,
        price: convertPriceStringToNumber(product.price),
      };
      console.log(
        parsedProduct,
        typeof parsedProduct.price === 'number',
        product.price
      );
    }
  }
  return;
}

getProducts(0, 100000);

import { mockProductData } from './mockProductApi';

export interface Product {
  productId: string;
  name: string;
  price?: string | number;
}

interface ApiResponse {
  total: number;
  count: number;
  products: Product[];
}

// This simple conversion stands in for what would be a much more robust validation/conversion
// which would potentially have to handle different currencies and floats
function convertPriceStringToNumber(price: string) {
  if (price) {
    return parseInt(price);
  }
  return;
}

function getProducts(min: number, max: number): ApiResponse | undefined {
  let scrapedProducts: Product[] = [];

  if (mockProductData) {
    for (let product of mockProductData) {
      scrapedProducts.push({
        productId: product.productId,
        name: product.name,
        price: convertPriceStringToNumber(product.price as string),
      });
    }

    return {
      total: scrapedProducts.length,
      // this will become more specific
      count: scrapedProducts.length,
      products: scrapedProducts,
    };
  }
  return;
}

console.log(getProducts(0, 100000));

import { mockProductData } from './mockProductApi';

export interface Product {
  productId: string;
  name: string;
  price: string | number;
}

interface ApiResponse {
  total: number;
  count: number;
  products: Product[];
}

const initialPriceRange = [0, 100000];
let scrapedProducts: Product[] = [];
let scrapedProductIds = new Set<string>();

// in a real life context there would be more robust validation/conversion,
// handling different currencies and floats, etc.
function convertPriceStringToNumber(price: string) {
  return parseInt(price);
}

export function splitRangeInHalves(range: number[]) {
  return {
    lowerRange: [range[0], Math.floor((range[0] + range[1]) / 2) - 0.01],
    upperRange: [Math.floor((range[0] + range[1]) / 2), range[1]],
  };
}

export function getProducts(range: number[], data: Product[]): ApiResponse {
  let products: Product[] = [];
  let allProductsWithinRange: string[] = [];
  const [min, max] = range;

  for (let product of data) {
    let price = convertPriceStringToNumber(product.price as string);
    const isPriceWithinRange = price >= min && price <= max;

    if (isPriceWithinRange) {
      // this is an inelegant solution to the problem I have of pushing duplicate products
      // checking duplicates this way degrades performance
      const productId = product.productId;
      if (products.length < 1000 && !scrapedProductIds.has(productId)) {
        products.push({
          productId: product.productId,
          name: product.name,
          price,
        });

        scrapedProductIds.add(productId);
      }

      // we only need to track the length for 'total', so all the product data isn't needed
      allProductsWithinRange.push(product.productId);
    }
  }

  return {
    total: allProductsWithinRange.length,
    count: products.length,
    products,
  };
}

// function pushOrContinueToScrape(
//   productApiReponse: ApiResponse,
//   range: number[]
// ) {
//   if (productApiReponse.count <= 1000) {
//     // should I use the global scoped scrapedProducts?
//     return scrapedProducts.push(productApiReponse.products);
//   } else if (productApiReponse.total > 1000) {
//     return scrapeAllProducts(range);
//   }
// }

function scrapeAllProducts(range: number[]) {
  const { lowerRange, upperRange } = splitRangeInHalves(range);

  // get products, total and count within this range
  // TODO: rename for clarity, because it isn't only the products but the apiResponse with total and count
  const lowerRangeProducts = getProducts(lowerRange, mockProductData);
  const upperRangeProducts = getProducts(upperRange, mockProductData);

  if (lowerRangeProducts.count <= 1000) {
    scrapedProducts.push(...lowerRangeProducts.products);
  }

  if (upperRangeProducts.count <= 1000) {
    scrapedProducts.push(...upperRangeProducts.products);
  }

  if (
    lowerRangeProducts.total > 1000 &&
    scrapedProducts.length < mockProductData.length
  ) {
    scrapeAllProducts(lowerRange);
  }

  if (
    upperRangeProducts.total > 1000 &&
    scrapedProducts.length < mockProductData.length
  ) {
    scrapeAllProducts(upperRange);
  }

  console.log({ lowerRange, upperRange });
}

scrapeAllProducts(initialPriceRange);

console.log(
  'scrapedProducts.length: ',
  scrapedProducts.length,
  'mockProductData.length: ',
  mockProductData.length
);

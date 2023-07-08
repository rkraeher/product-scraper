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

let scrapedProducts: any = [];
const data = mockProductData;
let bifurcateCallCount = 1;

// in a real life context there would be more robust validation/conversion, handling different currencies and floats, etc.
function convertPriceStringToNumber(price: string) {
  return parseInt(price);
}

export function getProducts(range: number[], data: Product[]): ApiResponse {
  let products: Product[] = [];
  let allProductsWithinRange: Product[] = [];
  const [min, max] = range;

  for (let product of data) {
    let price = convertPriceStringToNumber(product.price as string);
    const isPriceWithinRange = price >= min && price <= max;

    if (isPriceWithinRange) {
      if (products.length < 1000)
        products.push({
          productId: product.productId,
          name: product.name,
          price,
        });

      allProductsWithinRange.push({
        productId: product.productId,
        name: product.name,
        price,
      });
    }
  }

  return {
    total: allProductsWithinRange.length,
    count: products.length,
    products,
  };
}

// TODO please fix my tests
// I think I am broken
export const getSplitRanges = (range: number[]) => {
  // for now we will just handle non-negative integers
  let lowerRange = [range[0], range[1] / 2 - 1];
  let upperRange = [range[1] / 2, range[1]];

  // this /2 - 1 is too imprecise (and doesn't account for decimals)
  // there seem to be 2 or 3 extra calls, with duplicate ranges
  console.log({
    lowerRange,
    upperRange,
  });

  return {
    lowerRange,
    upperRange,
  };
};

function scrapeAllProducts(range: number[]) {
  const { lowerRange, upperRange } = getSplitRanges(range);
  bifurcateCallCount++;

  // get products, total and count within this range
  // TODO: rename for clarity, because it isn't only the products but the apiResponse with total and count
  const lowerRangeProducts = getProducts(lowerRange, data);
  const upperRangeProducts = getProducts(upperRange, data);

  if (lowerRangeProducts.count <= 1000) {
    scrapedProducts.push(...lowerRangeProducts.products);
  }

  if (upperRangeProducts.count <= 1000) {
    scrapedProducts.push(...upperRangeProducts.products);
  }

  if (lowerRangeProducts.total > 1000 && scrapedProducts.length < data.length) {
    scrapeAllProducts(lowerRange);
  }

  if (upperRangeProducts.total > 1000 && scrapedProducts.length < data.length) {
    scrapeAllProducts(upperRange);
  }
}

if (scrapedProducts.length < data.length) {
  const initialPriceRange = [0, 100000];
  scrapeAllProducts(initialPriceRange);
}

console.log(
  //{ scrapedProducts },
  //{ data },
  'scrapedProducts.length: ',
  scrapedProducts.length,
  'data.length: ',
  data.length,
  // find a way to directly verify that the scrapedProducts has all from the api without duplicates
  // scrapedProducts === data,
  { bifurcateCallCount }
);

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

// we will eventually be adding to this, our growing list of all products
//let scrapedProducts: Product[] = [];

// This simple conversion stands in for what would be a much more robust validation/conversion
// which would potentially have to handle different currencies and floats
function convertPriceStringToNumber(price: string) {
  return parseInt(price);
}

const data = mockProductData;

export function getProducts(range: number[], data: Product[]): ApiResponse {
  let products: Product[] = [];
  const [min, max] = range;

  for (let product of data) {
    let price = convertPriceStringToNumber(product.price as string);
    const isPriceWithinRange = price && price >= min && price <= max;

    // we still need the total within the range, not just the count
    if (isPriceWithinRange && products.length < 1000) {
      products.push({
        productId: product.productId,
        name: product.name,
        price,
      });
    }
  }

  return {
    total: data.length,
    // this will become more specific and only return first 1000 products
    count: products.length,
    products,
  };
}

const testRange = [0, 300];
const response = getProducts(testRange, data);
console.log(
  response,
  `inputRange: ${testRange}`,
  `count: ${response.count}`,
  `total: ${response.total}`
);

// initial call
const initialRange = [0, 100000];

// we must track the prev range
const ranges = new Map();
ranges.set(JSON.stringify(initialRange), initialRange);

// maybe should be while loop
// while total > 1000

export const getHalvedRanges = (range: number[]) => {
  // for now we will just handle non-negative integers
  let newUpperRange = [range[1] / 2, range[1]];
  let newLowerRange = [range[0], range[1] / 2 - 1];

  return {
    newLowerRange,
    newUpperRange,
  };
};

const splitRanges = getHalvedRanges(ranges.get(JSON.stringify(initialRange)));
// console.log(splitRanges);

// call each new range and check for 1000 again

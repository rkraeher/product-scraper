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

function getProducts(min: number, max: number): ApiResponse {
  let scrapedProducts: Product[] = [];

  if (mockProductData) {
    for (let product of mockProductData) {
      scrapedProducts.push({
        productId: product.productId,
        name: product.name,
        price: convertPriceStringToNumber(product.price as string),
      });
    }
  }

  return {
    total: scrapedProducts.length,
    // this will become more specific and only return first 1000 products
    count: scrapedProducts.length,
    products: scrapedProducts,
  };
}

// we need a program for splitting the min/max range and then calling getProducts

// continually call the shrinking range until we get to a count of 1000 or less
// add those 1000 or less items to our product list
// stop calling that range

// theres the checking for 1000
// then theres keeping track of a range, and splitting it

// initial call
const initialRange = [0, 100000];
//const response = getProducts(initialRange[0], initialRange[1]);

const ranges = new Map();
ranges.set(JSON.stringify(initialRange), initialRange);

// maybe should be while loop
// while total > 1000

// we must track the prev range

// halve the range
const getHalvedRanges = (range: [number, number]) => {
  let newUpperRange = [range[1] / 2, range[1]];
  let newLowerRange = [range[0], range[1] / 2 - 1];

  return {
    newLowerRange,
    newUpperRange,
  };
};

//const splitRanges = getSplitRanges(ranges.get(JSON.stringify(initialRange)));

// call each new range and check for 1000 again

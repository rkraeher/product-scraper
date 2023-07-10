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

// here we simulate calling the api and receiving a response back
// in order to enable testing, I am scanning the entire mockData but of course
// their api would just be sending us back this data and we would have to check for duplicates
export function getProductDataFromApi(
  range: number[],
  data: Product[]
): ApiResponse {
  let products: Product[] = [];
  let productsInRange: string[] = [];
  const [min, max] = range;

  for (let product of data) {
    let price = convertPriceStringToNumber(product.price as string);
    const isPriceWithinRange = price >= min && price <= max;
    const isDuplicateProduct = scrapedProductIds.has(product.productId);

    if (isPriceWithinRange) {
      // this is an inelegant solution to the problem I have of pushing duplicate products
      // checking duplicates this way degrades performance
      if (products.length < 1000 && !isDuplicateProduct) {
        products.push({
          productId: product.productId,
          name: product.name,
          price,
        });
        scrapedProductIds.add(product.productId);
      }
      // we only need to track the length for 'total', so all the product data isn't needed
      productsInRange.push(product.productId);
    }
  }

  return {
    total: productsInRange.length,
    count: products.length,
    products,
  };
}

function scrapeAllProducts(range: number[]) {
  const { lowerRange, upperRange } = splitRangeInHalves(range);

  const scrapeRange = (range: number[]) => {
    const { count, products, total } = getProductDataFromApi(
      range,
      mockProductData
    );

    if (count <= 1000) {
      scrapedProducts.push(...products);
    }

    if (total > 1000 && scrapedProducts.length < mockProductData.length) {
      scrapeAllProducts(range);
    }
  };

  scrapeRange(lowerRange);
  scrapeRange(upperRange);

  console.log({ lowerRange, upperRange });
}

scrapeAllProducts(initialPriceRange);

console.log(
  'scrapedProducts.length: ',
  scrapedProducts.length,
  'mockProductData.length: ',
  mockProductData.length
);

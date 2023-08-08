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
const scrapedProductIds = new Map<string, boolean>();
let scrapedProducts: Product[] = [];
let numberOfApiRequests = 0;

// in a real life context there would be more robust validation/conversion, handling different currencies and floats, etc.
function convertPriceStringToNumber(price: string) {
  return parseInt(price);
}

export function splitRangeInHalves(range: number[]) {
  return {
    lowerRange: [range[0], Math.floor((range[0] + range[1]) / 2) - 0.01],
    upperRange: [Math.floor((range[0] + range[1]) / 2), range[1]],
  };
}

export function getProductDataFromApi(
  range: number[],
  data: Product[]
): ApiResponse {
  const [min, max] = range;
  let products: Product[] = [];
  let allProductsInRange = 0;

  // track for analytics
  numberOfApiRequests++;

  for (let product of data) {
    let price = convertPriceStringToNumber(product.price as string);
    const isPriceWithinRange = price >= min && price <= max;
    const productId = product.productId;

    if (isPriceWithinRange) {
      allProductsInRange++;

      if (products.length < 1000 && !scrapedProductIds.has(productId)) {
        products.push({
          productId,
          name: product.name,
          price,
        });
        scrapedProductIds.set(productId, true);
      }
    }
  }

  return {
    total: allProductsInRange,
    count: products.length,
    products,
  };
}

export function scrapeAllProducts(range: number[]) {
  const { lowerRange, upperRange } = splitRangeInHalves(range);

  const scrapeRange = (range: number[]) => {
    // we pass entire mockProductData for simulation purposes
    // we wouldn't have the full list of products but this script uses all the mockData just to get the value of 'total' and a list of products
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
}

scrapeAllProducts(initialPriceRange);

// do what we want with our scrapedProducts (return them, pass them somewhere for validation, de-duping, sorting etc.)
console.log(
  scrapedProducts,
  'scrapedProducts.length: ',
  scrapedProducts.length,
  'mockProductData.length: ',
  mockProductData.length,
  { numberOfApiRequests }
);

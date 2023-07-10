import { Product, splitRangeInHalves, getProductDataFromApi } from './index';
import { mockProductData as largeDataset } from './mockProductApi';

const mockProductData: Product[] = [
  {
    productId: '1',
    name: 'Product 1',
    price: 100,
  },
  {
    productId: '2',
    name: 'Product 2',
    price: 200,
  },
  {
    productId: '3',
    name: 'Product 3',
    price: 300,
  },
  {
    productId: '4',
    name: 'Product 4',
    price: 400,
  },
  {
    productId: '5',
    name: 'Product 5',
    price: 500,
  },
  {
    productId: '6',
    name: 'Product 6',
    price: 600,
  },
  {
    productId: '7',
    name: 'Product 7',
    price: 700,
  },
  {
    productId: '8',
    name: 'Product 8',
    price: 800,
  },
  {
    productId: '9',
    name: 'Product 9',
    price: 900,
  },
  {
    productId: '10',
    name: 'Product 10',
    price: 1000,
  },
];

describe('splitRangeInHalves', () => {
  it('should return the halved ranges correctly', () => {
    const range = [1, 10];
    const expected = {
      lowerRange: [1, 4.99],
      upperRange: [5, 10],
    };
    expect(splitRangeInHalves(range)).toEqual(expected);
  });

  it('should handle zero correctly', () => {
    const range = [0, 10];
    const expected = {
      lowerRange: [0, 4.99],
      upperRange: [5, 10],
    };
    expect(splitRangeInHalves(range)).toEqual(expected);
  });

  it('should handle floating-point numbers correctly', () => {
    const range = [1.5, 9.5];
    const expected = {
      lowerRange: [1.5, 4.99],
      upperRange: [5, 9.5],
    };
    expect(splitRangeInHalves(range)).toEqual(expected);
  });

  // we could also include an invalid test case checking for an error when passing negative values to the fn
});

describe('getProductDataFromApi', () => {
  it('should return the correct count of products within the price range', () => {
    const range = [300, 800];
    const expectedCount = 6;

    const result = getProductDataFromApi(range, mockProductData);

    expect(result.count).toBe(expectedCount);
  });

  it('should return the correct count of products when no products are within the price range', () => {
    const range = [1200, 1500];
    const expectedCount = 0;

    const result = getProductDataFromApi(range, mockProductData);

    expect(result.count).toBe(expectedCount);
  });

  it('should handle an empty product data array', () => {
    const range = [100, 200];
    const expectedCount = 0;

    const result = getProductDataFromApi(range, []);

    expect(result.count).toBe(expectedCount);
  });

  it('should handle invalid price values in the product data', () => {
    const range = [100, 200];
    let mockDataWithInvalidProduct = mockProductData;
    const expectedCount = 2;

    mockDataWithInvalidProduct.push({
      productId: 'invalid-product-id',
      name: 'Invalid Product',
      price: NaN,
    });

    const result = getProductDataFromApi(range, mockDataWithInvalidProduct);

    expect(result.count).toBe(expectedCount);
  });

  it('should return a maximum of 1000 products', () => {
    const range = [0, 100000];

    // For this test we need a larger dataset than our local mock
    // I prefer to do it this way rather than make the whole mockData larger
    // because is easier to skim a small mockData array when reviewing all the other tests
    const result = getProductDataFromApi(range, largeDataset);

    expect(result.count).toBeLessThanOrEqual(1000);
    expect(result.total).toBeGreaterThan(1000);
  });
});

describe.skip('scrapeAllProducts (check test file for comments)', () => {
  // as it is a recursive function I would have to find some ways to somehow mock the recursive calls
  // for time I won't do that here but I will suggest some possible test cases:

  it('should scrape all products within the initial price range', () => {
    // do stuff
  });
  it('should add returned products to the scrapedProducts array', () => {
    // do stuff
  });
  it('should continue scraping when the total exceeds 1000', () => {
    // do stuff
  });

  // Add more test cases to cover different scenarios and edge cases
});

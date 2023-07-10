import { Product, splitRangeInHalves, getProducts } from './index';
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

describe('getProducts', () => {
  it('should return the correct count of products within the price range', () => {
    const range = [300, 800];
    const expectedCount = 6;

    const result = getProducts(range, mockProductData);

    expect(result.count).toBe(expectedCount);
  });

  it('should return the correct count of products when no products are within the price range', () => {
    const range = [1200, 1500];
    const expectedCount = 0;

    const result = getProducts(range, mockProductData);

    expect(result.count).toBe(expectedCount);
  });

  it('should handle an empty product data array', () => {
    const range = [100, 200];
    const expectedCount = 0;

    const result = getProducts(range, []);

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

    const result = getProducts(range, mockDataWithInvalidProduct);

    expect(result.count).toBe(expectedCount);
  });

  it('should return a maximum of 1000 products', () => {
    const range = [0, 100000];

    // For this test we need a larger dataset than our local mock
    // I prefer to do it this way rather than make the whole mockData larger
    // because is easier to skim a small mockData array when reviewing all the other tests
    const result = getProducts(range, largeDataset);

    expect(result.count).toBeLessThanOrEqual(1000);
    expect(result.total).toBeGreaterThan(1000);
  });
});

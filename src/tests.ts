import { Product, getSplitRanges, getProducts } from './index';

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

describe('getSplitRanges', () => {
  it('should return the halved ranges correctly', () => {
    const range = [1, 10];
    // not good. this hardcoding the assertion object makes the test brittle
    const expected = {
      lowerRange: [1, 4],
      upperRange: [5, 10],
    };
    expect(getSplitRanges(range)).toEqual(expected);
  });

  it('should handle zero correctly', () => {
    const range = [0, 10];
    const expected = {
      lowerRange: [0, 4],
      upperRange: [5, 10],
    };
    expect(getSplitRanges(range)).toEqual(expected);
  });

  // this one would be important for price data
  it.skip('should handle floating-point numbers correctly', () => {
    const range = [1.5, 9.5];
    const expected = {
      newLowerRange: [1.5, 4.75],
      newUpperRange: [4.75, 9.5],
    };
    expect(getSplitRanges(range)).toEqual(expected);
  });

  it.skip('should handle negative numbers correctly', () => {
    const range = [-5, 5];
    const expected = {
      newLowerRange: [-5, 2.5],
      newUpperRange: [2.5, 5],
    };
    expect(getSplitRanges(range)).toEqual(expected);
  });
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
    const range = [0, 5000];

    const result = getProducts(range, mockProductData);

    expect(result.count).toBeLessThanOrEqual(1000);
  });
});

import * as fs from 'fs';
import { Product } from './index';

function mockProductApi(): Product[] | undefined {
  let mockData;
  try {
    const mockDataString = fs.readFileSync('src/productApiData.json', 'utf-8');
    mockData = JSON.parse(mockDataString) as Product[];
  } catch (err) {
    console.error(err);
  }
  return mockData ? mockData : undefined;
}

export const mockProductData = mockProductApi();

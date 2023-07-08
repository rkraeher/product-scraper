import * as fs from 'fs';
import { Product } from './index';

function mockProductApi(): Product[] {
  let mockData;
  try {
    const mockDataString = fs.readFileSync('src/productApiData.json', 'utf-8');
    mockData = JSON.parse(mockDataString) as Product[];
  } catch (err) {
    console.error(err);
  }
  return mockData ? mockData : [];
}

export const mockProductData = mockProductApi();

import * as fs from 'fs';
import { Product } from './index';

function mockProductApi(): Product[] | null {
  let mockData;
  try {
    const mockDataString = fs.readFileSync('src/productApiData.json', 'utf-8');
    mockData = JSON.parse(mockDataString) as Product[];
    console.log('data was read');
  } catch (err) {
    console.error(err);
  }
  return mockData ? mockData : null;
}

export const mockProductData = mockProductApi();

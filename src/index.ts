import { mockProductData } from './mockProductApi';

export interface Product {
  productId: string;
  name: string;
  price: string;
}

console.log({ mockProductData });

function convertNumber(price: string) {
  if (price) {
    return parseInt(price);
  }
  return null;
}

function getProducts(min: number, max: number): Product[] | null {
  return null;
}

import * as fs from 'fs';

try {
  const jsonString = fs.readFileSync('src/productApiData.json', 'utf-8');
  const jsonData = JSON.parse(jsonString);
  console.log('data was read', jsonData);
} catch (err) {
  console.error(err);
}

// numbers must be converted to string

interface Product {
  productId: string;
  name: string;
  price: string;
}

function getProducts(min: number, max: number): Product[] | null {
  return null;
}

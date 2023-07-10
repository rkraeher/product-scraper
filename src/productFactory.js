import { faker } from '@faker-js/faker';
import fs from 'fs';

function createRandomProduct() {
  return {
    productId: faker.string.uuid(),
    name: faker.commerce.product(),
    price: faker.commerce.price({
      min: 0,
      max: 100000,
      dec: 0,
    }),
  };
}

const MOCK_PRODUCT_DATA = faker.helpers.multiple(createRandomProduct, {
  count: 9999,
});

fs.writeFile(
  'src/productApiData.json',
  JSON.stringify(MOCK_PRODUCT_DATA),
  'utf-8',
  (err) => {
    if (err) {
      console.log('An error occurred while writing JSON object to file.');
      return console.log(err);
    }

    console.log('JSON file has been saved.');
  }
);

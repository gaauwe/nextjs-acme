import { faker } from '@faker-js/faker';

import { sleep } from '@/lib/utils';

import { categories, statuses } from './data';

export async function getProducts({ page }: { page: string }) {
  await sleep(1000);
  const currentPage = page ? parseInt(page, 10) : 1;

  const products = Array.from({ length: 10 }, (_item, index) => ({
    id: index,
    image: `https://picsum.photos/seed/${index}-product/1000/1000`,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    status: faker.helpers.arrayElement(statuses).value,
    category: faker.helpers.arrayElement(categories).value,
    totalSales: faker.number.int({ min: 1000, max: 9999 }).toString(),
    createdAt: faker.date.recent().toISOString(),
  }));

  return {
    data: products,
    meta: {
      page: {
        currentPage,
        perPage: 10,
        lastPage: 10,
        total: 100,
      },
      filters: [
        {
          label: 'Status',
          key: 'status',
          options: statuses,
        },
        {
          label: 'Category',
          key: 'category',
          options: categories,
        },
      ],
    },
  };
}

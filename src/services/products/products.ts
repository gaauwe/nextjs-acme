import { faker } from '@faker-js/faker';
import { cookies } from 'next/headers';

import { sleep } from '@/lib/utils';

import { categories, statuses } from './data';

export async function getProducts({
  page,
  pageSize,
  filters,
  sort,
}: {
  page: string | null;
  pageSize: string | null;
  filters: { key: string; value: string }[];
  sort?: Record<string, 'asc' | 'desc'>;
}) {
  cookies().get('email');
  await sleep(1000);
  faker.seed(123);

  const currentPage = page ? parseInt(page, 10) : 1;
  const perPage = pageSize ? parseInt(pageSize, 10) : 10;
  const total = 10000;

  const statusFilters = filters.filter((filter) => filter.key === 'filter[status]').map((filter) => filter.value);
  const categoryFilters = filters.filter((filter) => filter.key === 'filter[category]').map((filter) => filter.value);

  const rawProducts = Array.from({ length: total }, (_item, index) => ({
    id: currentPage * 10 + index,
    image: `https://picsum.photos/seed/${index}-product/1000/1000`,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    status: faker.helpers.arrayElement(statuses).value,
    category: faker.helpers.arrayElement(categories).value,
    totalSales: faker.number.int({ min: 1000, max: 9999 }).toString(),
    createdAt: faker.date.recent().toISOString(),
  }));

  const products = rawProducts
    .filter((product) => {
      if (statusFilters.length > 0 && !statusFilters.includes(product.status)) return false;
      if (categoryFilters.length > 0 && !categoryFilters.includes(product.category)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort) {
        const key = Object.keys(sort)[0];
        const direction = sort[key] === 'asc' ? 1 : -1;
        // @ts-expect-error - TS doesn't know that a and b are objects with keys
        return a[key] > b[key] ? direction : -direction;
      }
      return 0;
    });

  return {
    data: products.slice((currentPage - 1) * perPage, currentPage * perPage),
    meta: {
      page: {
        currentPage,
        perPage,
        lastPage: Math.ceil(products.length / perPage),
        total: products.length,
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

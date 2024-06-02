import { faker } from '@faker-js/faker';
import { cookies } from 'next/headers';

import { sleep } from '@/lib/utils';

import { categories, statuses } from './data';

export async function getProducts({
  page,
  pageSize,
  filters,
}: {
  page: string | null;
  pageSize: string | null;
  filters: { key: string; value: string }[];
}) {
  cookies().get('email');
  await sleep(1000);

  const currentPage = page ? parseInt(page, 10) : 1;
  const currentPerPage = pageSize ? parseInt(pageSize, 10) : 10;
  const statusFilters = filters.filter((filter) => filter.key === 'filter[status]');
  const categoryFilters = filters.filter((filter) => filter.key === 'filter[category]');

  const products = Array.from({ length: currentPerPage }, (_item, index) => ({
    id: currentPage * 10 + index,
    image: `https://picsum.photos/seed/${index + Math.random()}-product/1000/1000`,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    status: statusFilters.length > 0 ? faker.helpers.arrayElement(statusFilters).value : faker.helpers.arrayElement(statuses).value,
    category: categoryFilters.length > 0 ? faker.helpers.arrayElement(categoryFilters).value : faker.helpers.arrayElement(categories).value,
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

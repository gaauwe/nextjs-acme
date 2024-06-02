import { fakerNL as faker } from '@faker-js/faker';
import { cookies } from 'next/headers';

import { sleep } from '@/lib/utils';

import { roles } from './data';

export async function getCustomers({
  page,
  pageSize,
  filters,
  sort,
}: {
  page: string | null;
  pageSize: string | null;
  filters: { key: string; value: string }[];
  search: string | null;
  sort?: Record<string, 'asc' | 'desc'>;
}) {
  cookies().get('email');
  await sleep(1000);
  faker.seed(123);

  const currentPage = page ? parseInt(page, 10) : 1;
  const perPage = pageSize ? parseInt(pageSize, 10) : 10;
  const total = 10000;

  const rolesFilter = filters.filter((filter) => filter.key === 'filter[role]').map((filter) => filter.value);

  const rawProducts = Array.from({ length: total }, (_item, index) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      id: currentPage * 10 + index,
      name: firstName + ' ' + lastName,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      role: faker.helpers.arrayElement(roles).value,
      createdAt: faker.date.recent().toISOString(),
    };
  });

  const products = rawProducts
    .filter((product) => {
      return rolesFilter.length === 0 || rolesFilter.includes(product.role);
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
          label: 'Role',
          key: 'role',
          options: roles,
        },
      ],
    },
  };
}

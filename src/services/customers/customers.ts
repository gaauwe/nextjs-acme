import { fakerNL as faker } from '@faker-js/faker';
import { cookies } from 'next/headers';

import { sleep } from '@/lib/utils';

import { roles } from './data';

export async function getCustomers({
  page,
  pageSize,
  filters,
}: {
  page: string | null;
  pageSize: string | null;
  filters: { key: string; value: string }[];
  search: string | null;
}) {
  cookies().get('email');
  await sleep(1000);

  const currentPage = page ? parseInt(page, 10) : 1;
  const currentPerPage = pageSize ? parseInt(pageSize, 10) : 10;
  const roleFilter = filters.filter((filter) => filter.key === 'filter[role]');

  const products = Array.from({ length: currentPerPage }, (_item, index) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
      id: currentPage * 10 + index,
      name: firstName + ' ' + lastName,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      role: roleFilter.length > 0 ? faker.helpers.arrayElement(roleFilter).value : faker.helpers.arrayElement(roles).value,
      createdAt: faker.date.recent().toISOString(),
    };
  });

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
          label: 'Role',
          key: 'role',
          options: roles,
        },
      ],
    },
  };
}

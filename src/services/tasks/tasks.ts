'use server';
import { faker } from '@faker-js/faker';

import { sleep } from '@/lib/utils';

import { labels, priorities, statuses } from './data';

export async function getTasks() {
  await sleep(1000);

  return Array.from({ length: 100 }, () => ({
    id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
    title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
    status: faker.helpers.arrayElement(statuses).value,
    label: faker.helpers.arrayElement(labels).value,
    priority: faker.helpers.arrayElement(priorities).value,
  }));
}

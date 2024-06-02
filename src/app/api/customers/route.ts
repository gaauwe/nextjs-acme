import { type NextRequest } from 'next/server';

import { getCustomers } from '@/services/customers/customers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('page[size]');
  const search = searchParams.get('search');

  const filters: { key: string; value: string }[] = [];
  [...searchParams.entries()].forEach(([key, value]) => {
    if (key.startsWith('filter')) {
      filters.push({ key, value });
    }
  });

  return Response.json(await getCustomers({ page, pageSize, filters, search }));
}

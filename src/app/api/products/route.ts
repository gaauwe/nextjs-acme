import { type NextRequest } from 'next/server';

import { getProducts } from '@/services/products/products';

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

  const sortKey = [...searchParams.entries()].find(([key]) => key.startsWith('sort'));
  const match = sortKey?.[0].match(/\[(.*?)\]/);
  let sort: undefined | Record<string, 'asc' | 'desc'> = undefined;
  if (match && sortKey) {
    const value = match[1];
    sort = { [value]: searchParams.get(sortKey[0]) as 'asc' | 'desc' };
  }

  return Response.json(await getProducts({ page, pageSize, filters, sort, search }));
}

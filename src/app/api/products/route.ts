import { type NextRequest } from 'next/server';

import { getProducts } from '@/services/products/products';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('page[size]');

  const filters: { key: string; value: string }[] = [];
  [...searchParams.entries()].forEach(([key, value]) => {
    if (key.startsWith('filter')) {
      filters.push({ key, value });
    }
  });

  return Response.json(await getProducts({ page, pageSize, filters }));
}

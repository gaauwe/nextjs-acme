import { type NextRequest } from 'next/server';

import { getProducts } from '@/services/products/products';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  return Response.json(await getProducts({ page }));
}

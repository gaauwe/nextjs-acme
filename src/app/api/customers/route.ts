import { type NextRequest } from 'next/server';

import { getCustomers } from '@/services/customers/customers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  return Response.json(await getCustomers({ page }));
}

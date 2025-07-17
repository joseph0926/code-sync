import { cache } from 'react';

import { headers } from 'next/headers';

import { createCaller } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

/**
 * createContext
 * @description 서버 사이드에서 tRPC API를 호출하기 위한 헬퍼
 * @description 사용 이유 -> 설정 중앙화 / cache를 통한 같은 렌더링 사이클 재호출 방지
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: heads,
  });
});

export const api = createCaller(createContext);

import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { z, ZodError } from 'zod';

/**
 * createTRPCContext
 * @description 모든 tRPC 프로시저에서 접근할 수 있는 공유 데이터 객체
 * @description 각 요청마다 생성되며, 요청의 메타데이터(headers, session 등)를 담음
 * @param opts 현재는 headers만 전달 - 2025.07.17 joseph0926
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  /** `superjson`: Date, Map, Set, undefined 등을 JSON으로 안전하게 직렬화/역직렬화
   * @example```ts
   * return { createdAt: new Date() } // 일반 JSON으로 전달시 문자열로 전달됨
   * // superjson 이용시 Date 객체로 파싱
   * ```
   */
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? z.treeifyError(error.cause) : null,
      },
    };
  },
});

/** 서버 사이드에서 직접 프로시저를 호출할 때 사용 -> 주로 서버 컴포넌트 용 */
export const createCallerFactory = t.createCallerFactory;
/** 라우터를 생성하는 함수
 * @example```ts
 * const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => users),
  create: publicProcedure.mutation(() => {})
});
 * ```
 */
export const createTRPCRouter = t.router;
/** 인증 없이 접근 가능한 기본 프로시저 */
export const publicProcedure = t.procedure;

/**
 * 인증된 사용자용 프로시저
 * @param ctx 현재 context
 * @param next 다음 미들웨어나 실제 프로시저로 진행
 */
export const protectedProcedure = t.procedure.use(async ({ next }) => {
  // TODO: 인증 로직 구현 - 2025.07.17 joseph0926

  return next({
    ctx: {},
  });
});

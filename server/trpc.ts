import { initTRPC } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { TRPCError } from '@trpc/server'

export type Context = {
  user: {
    id: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
  } | null;
};


const t = initTRPC.context<Context>().create();

export async function createContext(
  opts: FetchCreateContextFnOptions
): Promise<Context> { 
    console.log('🔥 CONTEXT HIT:', opts.req.url);

  const apiKey = opts.req.headers.get('x-api-key');

  if (!apiKey || apiKey !== "key123") {
    // ❌ Yetkisiz
    return {
      user: {
        id: 'guest',
        email: 'guest@system',
        role: 'guest',
      },
    };
  }

  // ✅ Yetkili
  return {
    user: {
      id: '1',
      email: 'user@test.com',
      role: 'user',
    },
  };
}

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role === 'guest') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Yetkisiz erişim',
    });
  }

  return next();
});

export const router = t.router;
export const publicProcedure = t.procedure;
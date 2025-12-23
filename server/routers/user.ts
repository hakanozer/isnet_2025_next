import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Örnek veri
let users = [
  { id: 1, name: 'Ahmet', email: 'ahmet@example.com' },
  { id: 2, name: 'Ayşe', email: 'ayse@example.com' },
];

export const userRouter = router({
  // Tüm kullanıcıları getir
  getAll: publicProcedure.query(() => {
    return users;
  }),

  // ID ile kullanıcı getir
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return users.find(user => user.id === input.id);
    }),

  // Kullanıcıyı güncelle
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(2).optional(),
      email: z.email().optional(),
    }))
    .mutation(({ input }) => {
      const user = users.find(u => u.id === input.id);
      if (user) {
        if (input.name) user.name = input.name;
        if (input.email) user.email = input.email;
      }
      return user;
    }),

  // Yeni kullanıcı ekle
  create: publicProcedure
    .input(z.object({
      name: z.string().min(2),
      email: z.email(),
    }))
    .mutation(({ input }) => {
      const newUser = {
        id: users.length + 1,
        ...input,
      };
      users.push(newUser);
      return newUser;
    }),
});
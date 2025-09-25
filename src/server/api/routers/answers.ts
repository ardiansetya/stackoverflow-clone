import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const answerRouter = createTRPCRouter({
  createAnswer: protectedProcedure
    .input(z.object({ postId: z.string(), body: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;
      
        const newAnswer = await db.answer.create({
          data: {
            body: input.body,
            userId: session?.user.id,
            postId: input.postId,

          },
        });

      return newAnswer;
    }),

    getAnswersByPostId: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { db } = ctx;
      const { postId } = input;

      const answers = await db.answer.findMany({
        where: {
          postId: postId,
        },
        select: {
          id: true,
          body: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              image: true,
            },
          },
        },
      });
      return answers;
    }),
});

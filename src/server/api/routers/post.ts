import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { db, session } = ctx;

      const newPost = await db.post.create({
        data: {
          title: input.title,
          description: input.description,
          userId: session?.user.id,
        },
      });
      return newPost;
    }),

  getAllPosts: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        author: {
          select: {
            username: true,
            image: true,
          },
        },
      },

      orderBy: { createdAt: "desc" },
    });

    return posts;
  }),

  getPostById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { db } = ctx;
      const {postId  } = input;

      const post = await db.post.findUnique({
        where: { id: postId },
        select: {
          title: true,
          description: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              image: true,
            },
          },
        },
      });

      return post;
    }),
});

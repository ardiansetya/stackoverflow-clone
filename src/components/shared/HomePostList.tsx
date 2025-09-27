"use client";

import { api } from "~/trpc/react";
import PostCard from "./PostCard";
import { useSession } from "next-auth/react";

const HomePostList = () => {
  const postQuery = api.post.getAllPosts.useQuery(undefined, {
    enabled: !!useSession().data,
  });

  
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Recent Question</h2>

      {/* list post */}
     
        <div className="space-y-6">
          {postQuery.data?.map((post) => (
            <PostCard
              key={post.id}
              createdAt={post.createdAt}
              description={post.description}
              status={post.answers.length > 0 ? "ANSWERED" : "UNANSWERED"}
              title={post.title}
              userImage={post.author.image ?? ""}
              username={post.author.username ?? "user"}
              id={post.id}
              totalComments={post._count.answers}
            />
          ))}
        </div>
 
    </div>
  );
};

export default HomePostList;

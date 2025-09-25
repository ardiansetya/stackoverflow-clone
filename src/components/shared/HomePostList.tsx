"use client";

import { api } from "~/trpc/react";
import PostCard from "./PostCard";

const HomePostList = () => {
  const postQuery = api.post.getAllPosts.useQuery();
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
            status={"UNANSWERED"}
            title={post.title}
            userImage={post.author.image ?? ""}
            username={post.author.username ?? "user"}
            id={post.id}
            totalComments={0}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePostList;

import Link from "next/link";
import AnswerList from "~/components/shared/AnswerList";
import CreateAnswerCard from "~/components/shared/CreateAnswerCard";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/server";

const PostDetail = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;

  const postDetail = await api.post.getPostById({ postId });

  return (
    <div className="space-y-8">
      <div className="rounded-xl border p-6 space-y-4">
        {/* header */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback>
                {postDetail?.author.username?.charAt(0).toUpperCase() ?? ""}
              </AvatarFallback>
              <AvatarImage src={postDetail?.author.image ?? ""} />
            </Avatar>

            <div className="space-y-0.5">
              <Link href={`/profile/${postDetail?.author.username}`}>
                <p className="font-semibold">{postDetail?.author.username}</p>
              </Link>
              <p className="text-muted-foreground text-sm">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* {postDetail.status === "ANSWERED" ? (
            <Badge variant={"secondary"} className="h-fit">
              Answered
            </Badge>
          ) : (
            <Badge variant={"destructive"} className="h-fit">
              Unnswered
            </Badge>
          )} */}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{postDetail?.title}</h1>
          <p className="">{postDetail?.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        <CreateAnswerCard  postId={postId}  />
      </div>

      <AnswerList postId={postId} />
    </div>
  );
};

export default PostDetail;

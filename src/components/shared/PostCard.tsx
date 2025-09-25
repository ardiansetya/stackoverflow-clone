import { MessageSquareMore } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

type PostCardProps = {
  id: string;
  title: string;
  description: string;
  userImage: string;
  totalComments: number;
  username: string;
  createdAt: Date;
  status: "ANSWERED" | "UNANSWERED";
};

const PostCard = (props: PostCardProps) => {
  const postDataUrl = "/post/" + props.id;
  return (
    <>
      {/* post card */}
      <div className="space-y-4 rounded-xl border p-6 shadow">
        {/* header */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-14">
              <AvatarFallback>
                {props.username.charAt(0).toUpperCase()}
              </AvatarFallback>
              <AvatarImage src={props.userImage} />
            </Avatar>

            <div className="space-y-0.5">
              <Link href={`/profile/${props.username}`}>
                <p className="font-semibold">{props.username}</p>
              </Link>
              <p className="text-muted-foreground text-sm">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {props.status === "ANSWERED" ? (
            <Badge variant={"secondary"} className="h-fit">
              Answered
            </Badge>
          ) : (
            <Badge variant={"destructive"} className="h-fit">
              Unnswered
            </Badge>
          )}
        </div>

        {/* content */}
        <Link href={postDataUrl} className="group">
          <div className="space-y-1">
            <h3 className="group-hover:text-destructive text-lg font-semibold">
              {props.title}
            </h3>
            <p>{props.description}</p>
          </div>
        </Link>

        {/* footer */}
        <div className="mt-4 flex justify-between border-t pt-3">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <MessageSquareMore className="size-4" />
            <span>{props.totalComments}</span>
          </div>

          <Link href={postDataUrl} className="text-primary text-sm">
            View Post
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostCard;

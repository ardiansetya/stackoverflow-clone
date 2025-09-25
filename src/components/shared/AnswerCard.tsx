import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type AnswerCardProps = {
  username: string;
  userImage: string;
  answerDate: Date;
  answerContent: string;
}

const AnswerCard = (props: AnswerCardProps) => {
  return (
    <div className="space-y-4 rounded-xl border p-6">
      <div className="space-y-4">
        {/* header */}
        <div className="flex gap-3">
          <Avatar className="size-12">
            <AvatarFallback>{props.username}</AvatarFallback>
            <AvatarImage src={props.userImage ?? ""} alt="image" />
          </Avatar>
          <div className="space-y-1">
            <p className="font-medium">{props.username}</p>
            <p className="text-muted-foreground text-sm">
              {new Date(props.answerDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* content */}
      <p>
        {props.answerContent}
      </p>
    </div>
  );
}

export default AnswerCard
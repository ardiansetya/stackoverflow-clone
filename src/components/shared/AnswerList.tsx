"use client";

import { api } from "~/trpc/react";
import AnswerCard from "./AnswerCard";

type AnswerListProps = {
    postId: string;
}

const AnswerList = (props: AnswerListProps) => {

    const getAnswersQuery = api.answer.getAnswersByPostId.useQuery({postId: props.postId});

    console.log(getAnswersQuery.data);
  return (
    <div>
      {getAnswersQuery.data?.map((answer) => (
        <AnswerCard answerDate={answer.createdAt} answerContent={answer.body} username={answer.author.username ?? "user"} userImage={answer.author.image ?? ""} key={answer.id} />
      ))}
    </div>
  );
};

export default AnswerList;

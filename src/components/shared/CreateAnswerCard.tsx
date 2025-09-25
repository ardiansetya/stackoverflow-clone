"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Form, FormField } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { api } from "~/trpc/react";

const answerFormSchema = z.object({
  body: z.string().min(3).max(2000, "udah yappingnya?"),
});

type AnswerFormSchema = z.infer<typeof answerFormSchema>;

type CreateAnswerCardProps = {
  postId: string;
};




const CreateAnswerCard = ( props: CreateAnswerCardProps) => {
  const form = useForm<AnswerFormSchema>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      body: "",
    },
  });

  const {data} = api.answer.getAnswersByPostId.useQuery({postId: props.postId});
  const answerLength = data?.length ?? 0;

  const apiUtils = api.useUtils();

  const createAnswerMutation = api.answer.createAnswer.useMutation({
    onSuccess: async() => {
      alert("Answer created");
      form.reset();

     await apiUtils.answer.getAnswersByPostId.invalidate({postId: props.postId});
    },
  });


  const handleSubmit = (values: AnswerFormSchema) => {
    createAnswerMutation.mutate({ body: values.body, postId: props.postId  });
  };


  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{answerLength} Answer</h3>
      <Form {...form}>
        <Card>
          <CardHeader> Your Answer</CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
                <AvatarImage src="" />
              </Avatar>
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <Textarea placeholder="Your Answer" {...field} />
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={createAnswerMutation.isPending}
              onClick={form.handleSubmit(handleSubmit)}
            >
              {createAnswerMutation.isPending
                ? "Submitting..."
                : "Post Your Answer"}
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
};

export default CreateAnswerCard;

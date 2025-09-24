"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const createPostFormSchema = z.object({
  title: z.string().min(3).max(100, "max 100 karakter cok"),
  description: z.string().min(3).max(2000, "udah yappingnya?"),
});

type CreatePostFormSchema = z.infer<typeof createPostFormSchema>;

const CreatePostCard = () => {
  const form = useForm<CreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: { title: "", description: "" },
  });

  const createPostMutation = api.post.createPost.useMutation({
    onSuccess: (data) => {
      alert(`Post created `);
      form.reset();
    },
  });

  const handleCreatePost = (values: CreatePostFormSchema) => {
    createPostMutation.mutate({
      title: values.title,
      description: values.description,
    });
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ask a question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Avatar className="flex size-14 items-center justify-center gap-4">
              <AvatarFallback>{123123}</AvatarFallback>
              <AvatarImage src={""} />
            </Avatar>

            <div className="w-full space-y-1.5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Title of your question" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your question..."
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={createPostMutation.isPending} onClick={form.handleSubmit(handleCreatePost)}>
            {createPostMutation.isPending ? "Posting..." : "Post Your Question"}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
};

export default CreatePostCard;

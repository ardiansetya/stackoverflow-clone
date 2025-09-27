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
import { signIn, useSession } from "next-auth/react";

const createPostFormSchema = z.object({
  title: z.string().min(3).max(100, "max 100 karakter cok"),
  description: z.string().min(3).max(2000, "udah yappingnya?"),
});

type CreatePostFormSchema = z.infer<typeof createPostFormSchema>;

const CreatePostCard = () => {

  const {data: session, status, update} = useSession();


  const form = useForm<CreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: { title: "", description: "" },
  });

  const apiUtils = api.useUtils()

  const createPostMutation = api.post.createPost.useMutation({
    onSuccess: async() => {
      alert(`Post created `);
      form.reset();

      await apiUtils.post.getAllPosts.invalidate();
    },
  });

  const handleCreatePost = (values: CreatePostFormSchema) => {
    createPostMutation.mutate({
      title: values.title,
      description: values.description,
    });
  };

  const handleLogin = async() => {
    await signIn("google");
  }

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ask a question</CardTitle>
        </CardHeader>

        {!!session ? (
          <CardContent>
            <div className="flex gap-4">
              <Avatar className="flex size-14 items-center justify-center gap-4">
                <AvatarFallback>
                  {session.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
                <AvatarImage src={session.user.image ?? ""} alt="image" />
              </Avatar>

              <div className="w-full space-y-1.5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Title of your question "
                          {...field}
                          className="border-accent-foreground border"
                        />
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
                          className="border-accent-foreground min-h-24 border "
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-5">
              <p className="text-center text-xl">
                Please sign in to ask a question
              </p>
              <Button onClick={handleLogin} size={"lg"}>
                Sign In
              </Button>
            </div>
          </CardContent>
        )}

        {!!session && (
          <CardFooter className="flex justify-end">
            <Button
              disabled={createPostMutation.isPending}
              onClick={form.handleSubmit(handleCreatePost)}
              variant={"secondary"}
            >
              {createPostMutation.isPending
                ? "Posting..."
                : "Post Your Question"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </Form>
  );
};

export default CreatePostCard;

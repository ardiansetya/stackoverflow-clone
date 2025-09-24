import CreatePostCard from "~/components/shared/CreatePostCard";

export default async function Home() {
  return (
    <main className="space-y-8">
      <div className="space-y-1 ">
        <h1 className="text-4xl font-bold">Q&A Forum</h1>
        <p className="text-muted-foreground text-sm">Ask Question, share knowledge, and help community grows</p>
      </div>

    <CreatePostCard/>
    </main>
  );
}

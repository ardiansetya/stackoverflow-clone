import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";

const ProfilePage = () => {
  return (
    <main className="container mx-auto max-w-4xl py-8">
      ProfilePage
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-0.5">
            <Avatar className="flex size-16 items-center justify-center gap-4">
              <AvatarFallback>JD</AvatarFallback>
              <AvatarImage
               
                src="https://github.com/shadcn.png"
              />
            </Avatar>
            <p className="font-bold">jhon doe</p>
            <p className="">jhondoe@gmail.com</p>
            <p className="text-muted-foreground text-sm">jhondoe</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default ProfilePage;

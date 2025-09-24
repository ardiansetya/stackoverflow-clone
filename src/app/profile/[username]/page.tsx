import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import {api} from '~/trpc/server';

const ProfilePage = async ({params}: {params: Promise<{username: string}>}) => {

  const { username } = await params;

  const profile = await api.user.getProfileByUsername({username})


  return (
    <main className="container mx-auto max-w-4xl py-8">
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-0.5">
            <Avatar className="flex size-16 items-center justify-center gap-4">
              <AvatarFallback>{profile.username?.charAt(0).toUpperCase() }</AvatarFallback>
              <AvatarImage
                src={profile?.image ?? undefined}
              />
            </Avatar>
            <p className="font-bold">{ profile?.name }</p>
            <p className="">{profile.email}</p>
            <p className="text-muted-foreground text-sm">{profile.username}</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default ProfilePage;

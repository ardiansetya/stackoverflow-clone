"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

const Navbar = () => {
  const session = useSession();


  const handleLogin = async() => {
    await signIn("google");
  }

  const handleLogout = async() => {
    await signOut();
  }



  return (
    <header className="flex h-16 items-center justify-between border border-b p-2 px-6">
      <h1>Q&A Forum</h1>

      <div>
        {session?.data?.user ? (
          <div className="flex items-center gap-4">
            {/* <Link href={`/profile/${session.data.user.username}`}>{session.data.user.name}</Link> */}
            <Button onClick={handleLogout}>sign out</Button>
          </div>
        ) : (
          <Button onClick={handleLogin}>sign in with google</Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;

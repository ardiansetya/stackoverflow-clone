"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

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
      <Link href="/" className="text-xl font-bold">
        Q&A Forum
      </Link>

      <div>
        {session?.data?.user ? (
          <div className="flex items-center gap-4">
            {/* <Link href={`/profile/${session.data.user.username}`}>{session.data.user.name}</Link> */}
            <Button variant={"secondary"} onClick={handleLogout}>
              sign out
            </Button>
          </div>
        ) : (
          <Button onClick={handleLogin}>sign in with google</Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;

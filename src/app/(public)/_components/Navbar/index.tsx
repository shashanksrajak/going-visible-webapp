import React from "react";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";

// import { currentUser } from "@clerk/nextjs/server";

import MobileNavigation from "./MobileNavigation";
// import { ColorModeButton } from "@/components/ui/color-mode";

export default async function Navbar() {
  // const user = await currentUser();
  const user = false;
  return (
    <div className="shadow-md bg-bg-panel sticky top-0 z-100">
      <div className="container mx-auto p-4">
        <div className="flex flex-row gap-4 items-center justify-between">
          <div>
            <h1
              className="text-2xl font-semibold text-primary"
              aria-label="Going Visible | Back to home page"
            >
              Going Visible
            </h1>
          </div>

          <nav>
            <div className="flex flex-row gap-4 md:gap-10 items-center">
              <div className="hidden md:flex flex-row gap-4 md:gap-10">
                <NextLink href={`/about`} passHref>
                  About
                </NextLink>

                <NextLink href={`/blogs`} passHref>
                  Blogs
                </NextLink>

                <NextLink href={`/contact`} passHref>
                  Contact
                </NextLink>
              </div>

              {/* <ColorModeButton /> */}

              <div className="hidden md:flex flex-row gap-4 md:gap-10">
                {user ? (
                  <NextLink href={`/dashboard`} passHref>
                    <Button variant={"default"}>Dashboard</Button>
                  </NextLink>
                ) : (
                  <NextLink href={`/sign-in`} passHref>
                    <Button variant={"default"}>Sign In</Button>
                  </NextLink>
                )}
              </div>

              <MobileNavigation />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import NextLink from "next/link";
import { Menu } from "lucide-react";
// import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

export default function MobileNavigation() {
  // const { isSignedIn } = useAuth();
  const isSignedIn = false;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex md:hidden" variant={"ghost"}>
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side={"bottom"} className="py-10">
          <div className="flex flex-col gap-8">
            <NextLink href={`/about`} passHref>
              About
            </NextLink>

            <NextLink href={`/blogs`} passHref>
              Blog{" "}
            </NextLink>

            <NextLink href={`/contact`} passHref>
              Contact
            </NextLink>
          </div>

          <SheetFooter className="flex justify-center pt-8">
            {!isSignedIn ? (
              <>
                <NextLink href={`/sign-in`} passHref>
                  <Button className="bg-primary text-white">Sign In</Button>
                </NextLink>

                <NextLink href={`/sign-up`} passHref>
                  <Button className="bg-primary text-white">Sign Up</Button>
                </NextLink>
              </>
            ) : (
              <NextLink href={`/dashboard`} passHref>
                <Button className="bg-primary text-white">Dashboard</Button>
              </NextLink>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

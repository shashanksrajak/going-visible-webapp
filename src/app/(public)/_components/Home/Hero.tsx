"use client";

import { Play } from "lucide-react";
import NextLink from "next/link";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="container mx-auto max-w-5xl py-20 md:py-28">
      <div className="text-center flex flex-col items-center gap-8 md:gap-10">
        <h1 className=" font-semibold text-3xl sm:text-4xl md:text-6xl leading-tight text-primary">
          Empowering People with
          <br />
          <span className="text-orange-300">Invisible Illnesses</span>
          <br />
          <span className="block max-w-3xl">to Truly Going Visible</span>
        </h1>

        <h2 className="text-xl md:text-2xl">
          Monitor your mood, pain, medications, and appointments all in one
          place.
        </h2>

        <div className="flex gap-6">
          <NextLink href="/sign-up" passHref>
            <Button size={"lg"}>Get Started</Button>
          </NextLink>
          <Button size={"lg"} variant={"secondary"}>
            <Play />
            Watch Demo
          </Button>
        </div>
        <div className="w-full">
          {/* <Illustration
                        height={{ sm: "24rem", lg: "28rem" }}
                        mt={{ base: 12, sm: 16 }}
                    /> */}
        </div>
      </div>
    </div>
  );
}

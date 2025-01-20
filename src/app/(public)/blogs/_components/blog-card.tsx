import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// import Image from "next/image";

export default function BlogCard() {
  return (
    <Card className="overflow-hidden">
      <div className="mb-4">
        <img
          src="https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Placeholder"
          className="w-full h-auto object-cover"
        />
      </div>
      <CardContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
        fugiat magnam reprehenderit numquam quam voluptatem!
      </CardContent>

      <CardFooter>
        <Button>Read more</Button>
      </CardFooter>
    </Card>
  );
}

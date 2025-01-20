import React from "react";
import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import {
  Pill,
  Calendar,
  Search,
  UsersRound,
  PersonStanding,
  SmilePlus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const iconMap = {
  Pill,
  Calendar,
  Search,
  UsersRound,
  PersonStanding,
  SmilePlus,
};

const featuresList = [
  {
    title: "Track Your Mood, Day by Day",
    description:
      "Log your emotions effortlessly and discover patterns over time. Visualize your emotional health with intuitive charts and insights.",
    icon: "SmilePlus",
    learnMoreLink: `https://www.youtube.com`,
  },
  {
    title: "Pinpoint Pain with Precision",
    description:
      "Use an interactive 3D body to mark areas of discomfort and track pain intensity. Gain insights to share with your doctor for better care.",
    icon: "PersonStanding",
    learnMoreLink: `https://www.youtube.com`,
  },
  {
    title: "Never Miss a Dose",
    description:
      "Set reminders and track your medications in one place. Stay on top of your treatment plan with ease.",
    icon: "Pill",
    learnMoreLink: `https://www.youtube.com`,
  },
  {
    title: "Stay Organized, Stay Informed",
    description:
      "Keep track of your doctor’s appointments and securely store your lab reports for easy access anytime.",
    icon: "Calendar",
    learnMoreLink: `https://www.youtube.com`,
  },
  {
    title: "Your Health Network, Simplified",
    description:
      "Search for trusted doctors and nearby pharmacies. Access professional care and resources when you need them most.",
    icon: "Search",
    learnMoreLink: `https://www.youtube.com`,
  },
  {
    title: "Connect with Care",
    description:
      "Create a group of caretakers, family, and friends who can receive updates and provide support whenever you need it.",
    icon: "UsersRound",
    learnMoreLink: `https://www.youtube.com`,
  },
];

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto py-16 container px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Features</h1>
        <p className="mt-4">
          From tracking your mood and pain to managing appointments and
          medications, Going Visible brings all the tools you need into one
          place. Explore our features designed to make life simpler and more
          connected.
        </p>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuresList.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <Card key={feature.title}>
                <CardHeader>
                  <IconComponent size={32} className="text-primary" />
                </CardHeader>
                <CardContent>
                  <h2 className="text-xl font-semibold">{feature.title}</h2>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {feature.description}
                  </p>

                  <div className="mt-auto flex space-x-4"></div>
                </CardContent>

                <CardFooter className="gap-4">
                  <NextLink href={`/sign-up`}>
                    <Button>Start Now</Button>
                  </NextLink>
                  <NextLink href={feature.learnMoreLink} target="_blank">
                    <Button variant={"outline"}>Learn More</Button>
                  </NextLink>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

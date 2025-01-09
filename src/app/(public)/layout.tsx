import Navbar from "@/components/shared/nav-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page | Going Visible",
  description: "Pain management and wellness for the modern world.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

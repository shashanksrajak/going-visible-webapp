import type { Metadata } from "next";

import Navbar from "./_components/Navbar";

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

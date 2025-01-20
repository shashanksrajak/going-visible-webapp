import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex justify-center mt-10">
      {children}
    </div>
  );
}

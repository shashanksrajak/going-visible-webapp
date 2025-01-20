import React from "react";

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-primary text-white">
      <div className="container mx-auto p-4 flex flex-col gap-5 items-center py-20">
        <div className="font-semibold text-6xl">{title}</div>
        {subtitle && <div className="text-center">{subtitle}</div>}
      </div>
    </div>
  );
}

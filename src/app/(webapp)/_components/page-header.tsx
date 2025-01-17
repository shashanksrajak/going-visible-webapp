"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const PageHeader = ({
  title,
  actions = [],
  description,
}: {
  title: string;
  description?: string;
  actions?: { label: string; target: string; className?: string }[];
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Title */}
      <div>
        <h2 className="font-semibold text-3xl">{title}</h2>

        {/* Description */}
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            className={`px-4 py-2 text-sm font-medium rounded-md ${action.className}`}
            onClick={() => {}}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;

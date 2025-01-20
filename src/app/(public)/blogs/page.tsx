import React from "react";
import PageHeader from "../_components/page-header";
import BlogCard from "./_components/blog-card";

export default function Page() {
  return (
    <>
      <PageHeader title="Blog" />

      <div className="container mx-auto my-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </>
  );
}

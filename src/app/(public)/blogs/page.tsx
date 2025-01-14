import React from "react";

import { Container, SimpleGrid } from "@chakra-ui/react";
import BlogCard from "./_components/BlogCard";
import PageHeader from "@/components/shared/page-header";

export default function BlogPage() {
  return (
    <>
      <PageHeader
        type="page"
        title={"Blogs"}
        description={"Check out our latest blog posts"}
      />
      <Container centerContent={true} maxWidth={"full"} py={20}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </SimpleGrid>
      </Container>
    </>
  );
}

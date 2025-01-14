import { Card, HStack, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";
// import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function BlogCard() {
  return (
    <Card.Root maxW="full" overflow="hidden">
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />
      <Card.Body gap="2">
        <HStack justifyContent={"space-between"}>
          <Text fontSize="sm" color={"gray.700"}>
            January 4, 2025
          </Text>
          {/* <Avatar name="John Doe" src="https://bit.ly/dan-abramov" /> */}
        </HStack>
        <Card.Title>Living room Sofa</Card.Title>
        <Card.Description>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.
        </Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <NextLink href={"/blogs/what-is-going-visible"} passHref>
          <Button variant="outline" colorPalette={"primary"}>
            Read more
          </Button>
        </NextLink>
      </Card.Footer>
    </Card.Root>
  );
}

import {
  Container,
  Heading,
  VStack,
  Box,
  Text,
  Card,
  Group,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

import { featuresList } from "./constants";

import { Button } from "@/components/ui/button";
import {
  Pill,
  Calendar,
  Search,
  UsersRound,
  PersonStanding,
  SmilePlus,
} from "lucide-react";

const iconMap = {
  Pill,
  Calendar,
  Search,
  UsersRound,
  PersonStanding,
  SmilePlus,
};

export default function Features() {
  return (
    <Container maxWidth={"6xl"} py={16}>
      <VStack>
        <Heading size={"5xl"}>Features</Heading>
        <Text textAlign={"center"}>
          From tracking your mood and pain to managing appointments and
          medications, Going Visible brings all the tools you need into one
          place. Explore our features designed to make life simpler and more
          connected.
        </Text>
      </VStack>

      <Box mt={10}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={10}>
          {featuresList.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <GridItem key={feature.title} height="100%">
                <Card.Root height="100%" variant={"elevated"}>
                  <Card.Body>
                    <Text color={"secondary.600"} mb={3}>
                      <IconComponent size={32} />
                    </Text>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Description>{feature.description}</Card.Description>
                  </Card.Body>
                  <Card.Footer>
                    <Group>
                      <NextLink href={`/sign-up`}>
                        <Button variant={"subtle"} colorPalette={"primary"}>
                          Start Now
                        </Button>
                      </NextLink>
                      <NextLink href={feature.learnMoreLink} target="_blank">
                        <Button variant={"outline"} colorPalette={"primary"}>
                          Learn More
                        </Button>
                      </NextLink>
                    </Group>
                  </Card.Footer>
                </Card.Root>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}

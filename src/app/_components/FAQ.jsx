"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: `How does AI enhance mood tracking?`,
    answer: `Our platform uses Gemini AI to analyze your mood logs with high accuracy. AI-driven insights help you understand your emotional patterns and receive personalized recommendations.`,
  },
  {
    question: `What is Gemini AI, and how does it work?`,
    answer: `Gemini AI is a state-of-the-art artificial intelligence technology that powers our mood tracking and analysis. It processes your mood data to provide detailed insights and feedback, improving your emotional awareness.`,
  },
  {
    question: `Can AI help with family alerts?`,
    answer: `Yes, Gemini AI manages the precision and timing of family alerts. It ensures that your family members receive relevant and timely updates about your mood logs.`,
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        FAQs
      </Typography>
      <Box sx={{ width: "100%" }}>
        {faqs.map((item, value) => {
          return (
            <Accordion
              key={value}
              expanded={expanded === value}
              onChange={handleChange(value)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4d-content"
                id="panel4d-header"
              >
                <Typography component="h3" variant="subtitle2">
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ maxWidth: { sm: "100%", md: "70%" } }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Container>
  );
}

"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: `What is "Going Visible"?`,
    answer: `"Going Visible" is a mood-tracking platform designed to help individuals with invisible illnesses, as well as anyone who wants to keep track of their emotional well-being. By logging your moods, you can gain insights into your emotional patterns and take steps towards better mental health.`,
  },
  {
    question: `How does mood logging work?`,
    answer: `Mood logging involves recording your emotional state at different times of the day. This helps you track changes in your mood over time, identify patterns, and gain insights into factors affecting your mental health.`,
  },
  {
    question: `Who can benefit from using this platform?`,
    answer: `While "Going Visible" is designed to support individuals with invisible illnesses, anyone can benefit from mood logging. Whether you're managing a chronic condition or simply interested in understanding your emotions better, our platform is here to help.`,
  },
  {
    question: `What are invisible illnesses?`,
    answer: `Invisible illnesses are medical conditions that aren't immediately visible to others. They can include chronic pain, mental health disorders, autoimmune diseases, and more. "Going Visible" aims to provide tools to help manage the emotional aspects of living with these conditions.`,
  },
  {
    question: `How can mood alerts help my family and friends?`,
    answer: `By enabling mood alerts, your family and friends can receive notifications when you're feeling low or need support. This feature helps you communicate your emotional needs and fosters understanding and support from your loved ones.`,
  },
  {
    question: `Is my data secure on the platform?`,
    answer: `Yes, your data security is our top priority. We use advanced encryption and secure protocols to ensure your mood logs and personal information remain private and protected.`,
  },
  {
    question: `Can I use the platform if I don't have a medical condition?`,
    answer: `Absolutely! "Going Visible" is for anyone interested in understanding their emotional well-being. Whether you have a medical condition or are simply looking to track your moods, our platform is designed to support you.`,
  },
  {
    question: `How does AI help in analyzing my mood?`,
    answer: `Our platform uses advanced AI, specifically Google Gemini, to analyze your mood based on your entries and images. This technology helps provide personalized insights and suggestions to support your emotional well-being.`,
  },
  {
    question: `What should I do if I notice negative patterns in my mood logs?`,
    answer: `If you notice consistent negative patterns, it's important to seek support. Consider reaching out to mental health professionals, utilizing coping strategies, and communicating with your support network for assistance.`,
  },
  {
    question: `How do I start using "Going Visible"?`,
    answer: `Getting started is simple! Just create an account, begin logging your moods, and explore the insights and features designed to enhance your emotional well-being. Whether you're using it for personal growth or managing an invisible illness, "Going Visible" is here to support you.`,
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
          width: { sm: "100%", md: "100%" },
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
                  sx={{ maxWidth: { sm: "100%", md: "100%" } }}
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

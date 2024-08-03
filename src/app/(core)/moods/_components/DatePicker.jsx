import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function MoodDatePicker({ selectedDate, onDateChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Select date"
          defaultValue={selectedDate}
          //   onChange={(newValue) => console.log(newValue.toDate())}
          onChange={(date) => onDateChange(date)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

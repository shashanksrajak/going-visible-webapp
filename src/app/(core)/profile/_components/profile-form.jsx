"use client";

import React, { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { updateProfile } from "@/lib/server-actions/profile";

export default function ProfileForm({ user }) {
  const [updating, setUpdating] = useState(false);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [bio, setBio] = useState(user.bio);
  const [medicalCondition, setMedicalCondition] = useState(
    user.medicalCondition || ""
  );

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!age || age < 0) {
      newErrors.age = "Age must be a positive number.";
    } else if (age > 120) {
      newErrors.age = "Age must be no more than 120.";
    }
    if (!gender) newErrors.gender = "Gender is required";
    if (!bio || bio.length < 10) {
      newErrors.bio = "Bio must be at least 10 characters long.";
    } else if (bio.length > 300) {
      newErrors.bio = "Bio must be no more than 300 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setUpdating(true);

      const profile = {
        name,
        age,
        gender,
        bio,
        medicalCondition,
      };

      const response = await updateProfile(user.uid, profile);

      if (response) {
        alert("Profile Updated.");
      }
      setUpdating(false);
    }
  };

  return (
    <>
      <Stack spacing={2} my={4}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          required
        />

        <TextField
          id="age"
          label="Age"
          variant="outlined"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          error={!!errors.age}
          helperText={errors.age}
          required
        />

        <FormControl fullWidth error={!!errors.gender} required>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            id="gender"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value={"MALE"}>Male</MenuItem>
            <MenuItem value={"FEMALE"}>Female</MenuItem>
            <MenuItem value={"NON_BINARY"}>Non-Binary</MenuItem>
            <MenuItem value={"PREFER_NOT_TO_SAY"}>Prefer Not to Say</MenuItem>
            <MenuItem value={"OTHER"}>Other</MenuItem>
          </Select>
          <FormHelperText>{errors.gender}</FormHelperText>
        </FormControl>

        <TextField
          id="bio"
          label="Bio"
          variant="outlined"
          type="text"
          value={bio}
          multiline
          rows={4}
          onChange={(e) => setBio(e.target.value)}
          error={!!errors.bio}
          helperText={errors.bio}
          required
        />

        <TextField
          id="medicalCondition"
          label="Medical Condition (If any)"
          variant="outlined"
          type="text"
          value={medicalCondition}
          onChange={(e) => setMedicalCondition(e.target.value)}
        />

        <Button variant="contained" onClick={handleSubmit} disabled={updating}>
          {updating ? "Updating..." : "Save"}
        </Button>
      </Stack>
    </>
  );
}

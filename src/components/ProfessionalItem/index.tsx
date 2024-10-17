import {
  ProfessionalDTO,
  ProfessionalDTOEmploymentStateEnum,
} from "../../apis/crm/api.ts";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import React from "react";
import useProfessionalItem from "./index.hook.ts";

export default function ProfessionalItem({
  professional,
  style,
}: {
  professional: ProfessionalDTO;
  style?: React.CSSProperties;
}) {
  const { avatarString } = useProfessionalItem(professional);

  return (
    <Box style={style}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar>{avatarString}</Avatar>

        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5">{`${professional.contact.name} ${professional.contact.surname}`}</Typography>

            <ProfessionalState state={professional.employmentState} />

            <Typography variant="h5" sx={{ marginLeft: "auto" }}>
              {`${new Intl.NumberFormat(navigator.languages[0], {
                style: "currency",
                currency: "EUR",
              }).format(professional.dailyRate)}/Day`}
            </Typography>
          </Box>

          <SkillsList
            skills={professional.skills}
            style={{ display: "flex", flexWrap: "wrap" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function ProfessionalState({
  state,
  style,
}: {
  state: ProfessionalDTOEmploymentStateEnum;
  style?: React.CSSProperties;
}) {
  function getColor(state: ProfessionalDTOEmploymentStateEnum) {
    switch (state) {
      case "Available":
        return "green";
      case "Employed":
        return "red";
      case "NotAvailable":
        return "yellow";
    }
  }

  return <Chip label={state} style={{ ...style, color: getColor(state) }} />;
}

function SkillsList({
  skills,
  style,
}: {
  skills: Set<string>;
  style?: React.CSSProperties;
}) {
  return (
    <Box style={style}>
      {[...skills].map((skill) => (
        <Chip key={skill} label={skill} variant="outlined" />
      ))}
    </Box>
  );
}

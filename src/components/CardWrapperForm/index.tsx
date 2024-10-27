import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

export default function CardWrapperForm<T>({
  title,
  steps,
  currentStepIndex,
  children,
}: {
  title: string;
  steps: { step: T; label: string }[];
  currentStepIndex: number;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader
        title={
          title && (
            <Typography variant="h3" sx={{ textAlign: "center", margin: 2 }}>
              {title}
            </Typography>
          )
        }
      />
      <CardContent>
        <Stepper sx={{ margin: 5 }} activeStep={currentStepIndex}>
          {steps.map((step, index) => (
            <Step key={`${step.step}`} completed={index < currentStepIndex}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {children}
      </CardContent>
    </Card>
  );
}

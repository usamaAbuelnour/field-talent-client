/* eslint-disable react/prop-types */
import { Stepper } from "react-form-stepper";

function FormStepper({ currentStep, steps }) {
  return (
    <Stepper
      activeStep={currentStep - 1}
      steps={steps.map((label) => ({ label }))}
      styleConfig={{
        activeBgColor: "#115e59",
        completedBgColor: "#10b981",
        inactiveBgColor: "#6b7280",
        activeColor: "#115e59",
      }}
    />
  );
}

export default FormStepper;

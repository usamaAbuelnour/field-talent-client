/* eslint-disable react/prop-types */
import Button from "../uiComponents/Button";

function FormButtonGroup({
  currentStep,
  totalSteps,
  handleNext,
  handlePrevious,
  handleSubmit,
  handleSkip,
  isSubmitting,
}) {
  return (
    <div className="flex justify-between mt-8 sticky bg-white dark:bg-gray-800">
      <Button onClick={handleSkip} text="Skip" variant="outline" />
      <div className="flex gap-3">
        <Button
          onClick={handlePrevious}
          text="Previous"
          disabled={currentStep === 1}
          className="btn btn-secondary"
        />
        <Button
          onClick={currentStep === totalSteps ? handleSubmit : handleNext}
          text={currentStep === totalSteps ? "Finish" : "Next"}
          className="btn btn-primary"
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
}

export default FormButtonGroup;

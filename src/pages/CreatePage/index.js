import CreateMap from "../../components/CreateMap";
import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import HikeForm from "../../components/HikeForm";
import { useSelector } from "react-redux";
import { selectMapSubmitted } from "../../store/map/selectors";

export default function CreatePage() {
  const [active, setActive] = useState(0);
  const mapSubmitted = useSelector(selectMapSubmitted);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  console.log(active);
  return (
    <div>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          label="Fist step"
          description="Create a hike"
          allowStepSelect={active > 0}
        >
          <HikeForm nextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Verify email"
          allowStepSelect={active > 1}
        >
          <CreateMap />
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Get full access"
          allowStepSelect={active > 2}
        >
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        {active !== 0 ? (
          <Button disabled={mapSubmitted ? false : true} onClick={nextStep}>
            Next step
          </Button>
        ) : (
          <></>
        )}
      </Group>
    </div>
  );
}

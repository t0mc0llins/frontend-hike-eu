import CreateMap from "../../components/CreateMap";
import { useEffect, useState } from "react";
import { Stepper, Button, Group, Box, Paper, Container } from "@mantine/core";
import HikeForm from "../../components/HikeForm";
import { useDispatch, useSelector } from "react-redux";
import { selectMapSubmitted } from "../../store/map/selectors";
import { incrementStepper, setPage } from "../../store/appState/actions";
import DetailForm from "../../components/DetailForm";

export default function CreatePage() {
  const [active, setActive] = useState(0);
  const mapSubmitted = useSelector(selectMapSubmitted);
  const dispatch = useDispatch();
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  // const prevStep = () =>
  //   setActive((current) => (current > 0 ? current - 1 : current));
  useEffect(() => {
    dispatch(incrementStepper(active));
  }, [active, dispatch]);

  useEffect(() => {
    dispatch(setPage("create"));
  }, []);
  return (
    <Container>
      <Paper p={20} mt={20}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          pl={50}
          pr={50}
        >
          <Stepper.Step
            label="First step"
            description="Create a hike"
            allowStepSelect={active > 0}
          >
            <HikeForm nextStep={nextStep} />
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Draw the trail"
            allowStepSelect={active > 1}
          >
            <CreateMap />
          </Stepper.Step>
          <Stepper.Step
            label="Final step"
            description="Add days and hike stages"
            allowStepSelect={active > 2}
          >
            <DetailForm />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          {active === 1 ? (
            <Button
              disabled={mapSubmitted ? false : true}
              color="green"
              size="md"
              onClick={nextStep}
            >
              Next step
            </Button>
          ) : (
            <></>
          )}
        </Group>
      </Paper>
    </Container>
  );
}

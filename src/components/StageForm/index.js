import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { submitStage } from "../../store/form/actions";
import { selectDays } from "../../store/form/selectors";

export default function StageForm() {
  const dispatch = useDispatch();
  const days = useSelector(selectDays);

  const form = useForm({
    initialValues: {
      stageTitle: "",
      stageDescription: "",
      distance: null,
      duration: null,
      elevation: null,
      startLocation: "",
      endLocation: "",
    },
  });

  const submitStageForm = (values) => {
    dispatch(submitStage(values));
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => submitStageForm(values))}>
        <Group position="right" mt="md">
          <TextInput
            description="Optional, days will be titled stage 1, stage 2 etc by default"
            label="Title"
            placeholder="day 1"
            {...form.getInputProps("stageTitle", { withError: false })}
          />
          <TextInput
            label="Description"
            placeholder="more details"
            required
            {...form.getInputProps("stageDescription", { withError: false })}
          />
          <NumberInput
            placeholder="10 km"
            label="Distance"
            {...form.getInputProps("distance", { withError: false })}
          />
          <NumberInput
            placeholder="3 hrs"
            label="Duration"
            required
            {...form.getInputProps("duration", { withError: false })}
          />
          <NumberInput
            placeholder="500 m"
            label="Elevation"
            required
            {...form.getInputProps("elevation", { withError: false })}
          />
          <TextInput
            label="Start location"
            placeholder="example trailhead"
            required
            {...form.getInputProps("startLocation", { withError: false })}
          />
          <TextInput
            label="End location"
            placeholder="example trailhead"
            required
            {...form.getInputProps("endLocation", { withError: false })}
          />
          <Button type="submit">Save stage</Button>
        </Group>
      </form>
    </Box>
  );
}

import { Box, Button, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitDay } from "../../store/form/actions";
import { selectDays } from "../../store/form/selectors";
import StageForm from "../StageForm";

export default function DayForm() {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const days = useSelector(selectDays);
  const [showForm, setShowForm] = useState(false);

  const form = useForm({
    initialValues: {
      dayTitle: "",
      dayDescription: "",
    },
  });

  const submitDayForm = (values) => {
    dispatch(submitDay(values));
    setSaved(true);
  };

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => submitDayForm(values))}>
          <Group position="right" mt="md">
            <TextInput
              description="Optional, days will be titled day 1, day 2 etc by default"
              label="Title"
              placeholder="day 1"
              {...form.getInputProps("dayTitle", { withError: false })}
            />
            <TextInput
              label="Description"
              placeholder="more details"
              {...form.getInputProps("dayDescription", { withError: false })}
            />
            <Button type="submit">Save day</Button>
          </Group>
        </form>
      </Box>
      {saved ? (
        <Box>
          <Title>Stages</Title>
          {/* map existing stages */}
          {!days[days.length - 1].stages ||
          days[days.length - 1].stages.length === 0 ? (
            <StageForm />
          ) : (
            <Box>
              <Button
                type="button"
                onClick={() => {
                  setShowForm(true);
                }}
              >
                Add stage
              </Button>
              {showForm ? <StageForm /> : <></>}
            </Box>
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

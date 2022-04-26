import { Box, Button, Group, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStageForm } from "../../store/appState/actions";
import { selectShowStageForm } from "../../store/appState/selectors";
import { submitDay } from "../../store/form/actions";
import StageForm from "../StageForm";
import { selectDays } from "../../store/form/selectors";

export default function DayForm() {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const stageForm = useSelector(selectShowStageForm);
  const days = useSelector(selectDays);

  const form = useForm({
    initialValues: {
      dayTitle: "",
      dayDescription: "",
    },
  });

  const submitDayForm = (values) => {
    dispatch(submitDay(values));
    setSaved(true);
    dispatch(showStageForm(true));
    form.reset();
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
          {days[days.length - 1].stages &&
          days[days.length - 1].stages.length !== 0 ? (
            days[days.length - 1].stages.map((s) => {
              return (
                <Box key={s.stageOrder}>
                  Stage {s.stageOrder}: {s.title}
                </Box>
              );
            })
          ) : (
            <Text>This day doesn't have any stages yet</Text>
          )}
          {stageForm ? (
            <StageForm />
          ) : (
            <Box>
              <Button
                type="button"
                onClick={() => {
                  dispatch(showStageForm(true));
                }}
              >
                Add stage
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

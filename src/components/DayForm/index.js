import {
  ActionIcon,
  Box,
  Button,
  Group,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStageForm } from "../../store/appState/actions";
import { selectShowStageForm } from "../../store/appState/selectors";
import { submitDay } from "../../store/form/actions";
import StageForm from "../StageForm";
import { selectDays } from "../../store/form/selectors";
import { Trash } from "tabler-icons-react";

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
          <Group position="left" mt="md">
            <TextInput
              description="An interesting title"
              required
              label="Title"
              placeholder="day 1"
              {...form.getInputProps("dayTitle", { withError: false })}
            />
            <Textarea
              label="Description"
              placeholder="more details"
              {...form.getInputProps("dayDescription", { withError: false })}
            />
            <Button
              type="submit"
              disabled={
                days.length !== 0 && days[days.length - 1].stages.length === 0
              }
            >
              Save day
            </Button>
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
                <Group>
                  <Text key={s.stageOrder}>
                    <strong>Stage {s.stageOrder}</strong> - {s.title}
                  </Text>
                  <ActionIcon color="red" variant="hover" onClick={() => {}}>
                    <Trash size={16} />
                  </ActionIcon>{" "}
                </Group>
              );
            })
          ) : (
            <Text color="red">
              This day doesn't have any stages yet. Add at least one to submit
              the hike.
            </Text>
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

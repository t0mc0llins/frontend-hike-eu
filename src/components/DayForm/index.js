import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  Space,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStageForm } from "../../store/appState/actions";
import { selectShowStageForm } from "../../store/appState/selectors";
import { submitDay } from "../../store/form/actions";
import StageForm from "../StageForm";
import { selectDays } from "../../store/form/selectors";
import { Pencil, Trash } from "tabler-icons-react";

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
              color="green"
              variant="outline"
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
          <Space h="md" />
          <Divider size="sm" />
          <Space h="sm" />
          <Title order={3}>Stages</Title>
          <Space h="sm" />
          {days[days.length - 1].stages &&
          days[days.length - 1].stages.length !== 0 ? (
            days[days.length - 1].stages.map((s) => {
              return (
                <Group spacing="xs" key={s.stageOrder}>
                  <Text>
                    <strong>Stage {s.stageOrder}</strong>{" "}
                  </Text>{" "}
                  — <Text> {s.title}</Text>
                  <Tooltip label="Edit stage" withArrow>
                    <ActionIcon
                      color="yellow"
                      variant="hover"
                      onClick={() => {}}
                    >
                      <Pencil size={16} />
                    </ActionIcon>{" "}
                  </Tooltip>
                  <Tooltip label="Delete stage" withArrow>
                    <ActionIcon color="red" variant="hover" onClick={() => {}}>
                      <Trash size={16} />
                    </ActionIcon>{" "}
                  </Tooltip>
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
            <>
              <Space h="sm" />
              <Divider size="xs" />
              <StageForm />
            </>
          ) : (
            <Box>
              <Space h="sm" />
              <Button
                type="button"
                variant="outline"
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

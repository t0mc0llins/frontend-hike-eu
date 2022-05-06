import {
  ActionIcon,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Space,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "tabler-icons-react";
import { saveForm } from "../../store/form/actions";
import { selectDays, selectSubmitable } from "../../store/form/selectors";
import DayForm from "../DayForm";

export default function DetailForm() {
  const days = useSelector(selectDays);
  const dispatch = useDispatch();
  const submitable = useSelector(selectSubmitable);
  const navigate = useNavigate();

  return (
    <Container pt={20}>
      <Title align="center" order={1}>
        Hike details
      </Title>
      <Title order={2}>Days</Title>
      <Space h="sm" />
      {days && days.length !== 0 ? (
        days.map((d) => {
          return (
            <Group key={d.title} spacing="xs">
              <Text>
                <strong>Day {d.dayOrder} </strong>
              </Text>{" "}
              — <Text> {d.title}</Text>{" "}
              <Tooltip label="Edit day" withArrow>
                <ActionIcon color="yellow" variant="hover" onClick={() => {}}>
                  <Pencil size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete day" withArrow>
                <ActionIcon color="red" variant="hover" onClick={() => {}}>
                  <Trash size={16} />
                </ActionIcon>{" "}
              </Tooltip>
            </Group>
          );
        })
      ) : (
        <Text color="red">No days added yet. You must add at least one.</Text>
      )}
      <Space h="sm" />
      <Divider size="xs" />
      <DayForm />
      <Center key={days}>
        <Button
          mt={20}
          color="green"
          size="md"
          disabled={submitable}
          onClick={() => {
            dispatch(saveForm());
            navigate("/");
          }}
        >
          Submit hike
        </Button>
      </Center>
    </Container>
  );
}

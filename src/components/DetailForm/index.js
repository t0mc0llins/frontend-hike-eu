import {
  ActionIcon,
  Button,
  Center,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash } from "tabler-icons-react";
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
      <Title order={3}>Days</Title>
      {days && days.length !== 0 ? (
        days.map((d) => {
          return (
            <Group>
              <Text key={d.title}>
                <strong>Day {d.dayOrder}</strong> - {d.title}
              </Text>{" "}
              <ActionIcon color="red" variant="hover" onClick={() => {}}>
                <Trash size={16} />
              </ActionIcon>{" "}
            </Group>
          );
        })
      ) : (
        <Text color="red">No days added yet. You must add at least one.</Text>
      )}
      <DayForm />
      <Center key={days}>
        <Button
          mt={20}
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

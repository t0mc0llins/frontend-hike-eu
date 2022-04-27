import { Button, Center, Container, Text, Title } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { saveForm } from "../../store/form/actions";
import { selectDays, selectSubmitable } from "../../store/form/selectors";
import DayForm from "../DayForm";

export default function DetailForm() {
  const days = useSelector(selectDays);
  const dispatch = useDispatch();
  const submitable = useSelector(selectSubmitable);

  return (
    <Container pt={20}>
      <Title align="center" order={1}>
        Hike details
      </Title>
      <Title order={3}>Days</Title>
      {days && days.length !== 0 ? (
        days.map((d) => {
          return (
            <Text key={d.title}>
              Day {d.dayOrder}: {d.title}
            </Text>
          );
        })
      ) : (
        <Text>No days added yet</Text>
      )}
      <DayForm />
      <Center key={days}>
        <Button
          disabled={submitable}
          onClick={() => {
            dispatch(saveForm());
          }}
        >
          Submit hike
        </Button>
      </Center>
    </Container>
  );
}

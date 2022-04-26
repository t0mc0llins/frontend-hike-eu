import { Box, Button, Title } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { saveForm } from "../../store/form/actions";
import { selectDays } from "../../store/form/selectors";
import DayForm from "../DayForm";

export default function DetailForm() {
  const days = useSelector(selectDays);
  const dispatch = useDispatch();

  return (
    <Box>
      {/* <Title>Hike info</Title> */}
      <Title>Days</Title>
      {days && days.length !== 0 ? (
        days.map((d) => {
          return (
            <Box key={d.dayOrder}>
              Day {d.dayOrder}: {d.title}
            </Box>
          );
        })
      ) : (
        <></>
      )}
      <DayForm />
      <Box>
        <Button
          disabled={
            !days ||
            days.length === 0 ||
            days[days.length - 1].stages.length === 0
          }
          onClick={() => {
            dispatch(saveForm());
          }}
        ></Button>
      </Box>
    </Box>
  );
}

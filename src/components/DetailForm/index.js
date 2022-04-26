import { Box, Button, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveForm } from "../../store/form/actions";
import { selectDays, selectSubmitable } from "../../store/form/selectors";
import DayForm from "../DayForm";

export default function DetailForm() {
  const days = useSelector(selectDays);
  const dispatch = useDispatch();
  const submitable = useSelector(selectSubmitable);

  // useEffect(() => {
  //   !days || days.length === 0 || days[days.length - 1].stages.length === 0
  //     ? setSubmitable(false)
  //     : setSubmitable(true);
  // }, [days]);

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
        <Text>No days added yet</Text>
      )}
      <DayForm />
      <Box key={days}>
        <Button
          disabled={submitable}
          onClick={() => {
            dispatch(saveForm());
          }}
        >
          Submit hike
        </Button>
      </Box>
    </Box>
  );
}

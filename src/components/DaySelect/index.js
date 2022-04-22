import { useEffect, useState } from "react";
import { SegmentedControl } from "@mantine/core";
import { setDayFilters } from "../../store/filter/actions";
import { useDispatch } from "react-redux";

export default function DaySelect() {
  const [days, setDays] = useState("3");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDayFilters(days));
  }, [days, dispatch]);

  return (
    <SegmentedControl
      value={days}
      onChange={setDays}
      data={[
        { label: "Single day", value: "1" },
        { label: "Multi-day", value: "2" },
        { label: "Both", value: "3" },
      ]}
    />
  );
}

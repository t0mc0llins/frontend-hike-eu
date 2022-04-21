import { useState } from "react";
import { SegmentedControl } from "@mantine/core";

export default function DaySelect() {
  const [days, setDays] = useState("both");
  return (
    <SegmentedControl
      value={days}
      onChange={setDays}
      data={[
        { label: "Single day", value: "single day" },
        { label: "Multi-day", value: "multi-day" },
        { label: "Both", value: "both" },
      ]}
    />
  );
}

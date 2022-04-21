import { CheckboxGroup, Checkbox } from "@mantine/core";
import { useState } from "react";

export default function SeasonSelect() {
  const [seasons, setSeasons] = useState(["0", "1", "2", "3"]);
  return (
    <CheckboxGroup value={seasons} onChange={setSeasons}>
      <Checkbox value="0" label="Spring" />
      <Checkbox value="1" label="Summer" />
      <Checkbox value="2" label="Autumn" />
      <Checkbox value="3" label="Winter" />
    </CheckboxGroup>
  );
}

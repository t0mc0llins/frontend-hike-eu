import { MultiSelect } from "@mantine/core";
import { countries } from "../../config/countries";

export default function CountrySelect() {
  return (
    <MultiSelect
      data={countries.map((c) => {
        return c.label;
      })}
      placeholder="Where would you like to go?"
      searchable
      clearable
      nothingFound="Nothing found"
    />
  );
}

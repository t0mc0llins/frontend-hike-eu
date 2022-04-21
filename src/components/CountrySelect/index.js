import { MultiSelect } from "@mantine/core";
import { countriesEmoji } from "../../config/countries-emoji";

export default function CountrySelect() {
  return (
    <MultiSelect
      data={countriesEmoji.map((c) => {
        return c.label;
      })}
      placeholder="Where would you like to go?"
      searchable
      clearable
      nothingFound="Nothing found"
    />
  );
}

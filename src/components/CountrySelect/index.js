import { MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { countriesEmoji } from "../../config/countries-emoji";
import { setCountryFilters } from "../../store/filter/actions";

export default function CountrySelect() {
  const dispatch = useDispatch();
  const [value, setValue] = useState([]);

  useEffect(() => {
    dispatch(setCountryFilters(value));
  }, [value, dispatch]);

  return (
    <MultiSelect
      data={countriesEmoji}
      placeholder="Where to?"
      searchable
      clearable
      nothingFound="Nothing found"
      value={value}
      onChange={setValue}
    />
  );
}

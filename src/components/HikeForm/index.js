import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Select,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Space,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { countriesEmoji } from "../../config/countries-emoji";
import { submitHike } from "../../store/form/actions";
import { setHikeFormatAction } from "../../store/hike/actions";

export default function HikeForm(props) {
  const [hikeFormat, setHikeFormat] = useState("loop");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHikeFormatAction(hikeFormat));
  });

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      country: "",
      seasons: [],
      start: "",
      end: "",
      image: "",
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto" pt={30}>
      <form
        onSubmit={form.onSubmit((values) =>
          dispatch(submitHike(values, props.nextStep()))
        )}
      >
        <TextInput
          required
          label="Title"
          placeholder="my awesome hike"
          {...form.getInputProps("title", { withError: false })}
        />
        <Space h="md" />
        <Textarea
          required
          label="Description"
          placeholder="a short summary"
          {...form.getInputProps("description", { withError: false })}
        />
        <Space h="md" />
        <Select
          label="Country"
          placeholder="Country"
          data={countriesEmoji}
          required
          searchable
          {...form.getInputProps("country", { withError: false })}
        />
        <Space h="lg" />
        <CheckboxGroup
          spacing="md"
          label="Best season(s)"
          description="What time of year is best to attempt this hike?"
          required
          {...form.getInputProps("seasons", {
            withError: false,
            type: "checkbox",
          })}
        >
          <Checkbox value="0" label="Spring" />
          <Checkbox value="1" label="Summer" />
          <Checkbox value="2" label="Autumn" />
          <Checkbox value="3" label="Winter" />
        </CheckboxGroup>
        <Space h="lg" />
        <RadioGroup
          value={hikeFormat}
          onChange={setHikeFormat}
          label="Hike format"
          description="Are you going in a loop or from A to B?"
          required
          size="sm"
        >
          <Radio value="loop" label="Loop" />
          <Radio value="point-to-point" label="Point-to-Point" />
        </RadioGroup>
        <Space h="lg" />
        <TextInput
          placeholder="such and such trailhead"
          label="Start location"
          required
          {...form.getInputProps("start", { withError: false })}
        />
        <Space h="md" />

        <TextInput
          placeholder="such and such trailhead"
          label="End location"
          disabled={hikeFormat === "loop" ? true : false}
          required={hikeFormat === "loop" ? false : true}
          {...form.getInputProps("end", { withError: false })}
        />
        <Space h="md" />

        <TextInput
          required
          placeholder="www.imagehost.com/mytrip.jpeg"
          label="Cover Image"
          {...form.getInputProps("image", { withError: false })}
        />
        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

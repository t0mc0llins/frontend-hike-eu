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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { apiUrl } from "../../config/constants";
import { countriesEmoji } from "../../config/countries-emoji";
import { appDoneLoading, appLoading } from "../../store/appState/actions";
import { setHikeDetails } from "../../store/form/actions";

export default function HikeForm(props) {
  const [hikeFormat, setHikeFormat] = useState("loop");
  const dispatch = useDispatch();

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

  async function submitHike(values) {
    const { title, description, country, seasons, start, end, image } = values;
    try {
      dispatch(appLoading());
      let endLocation;
      end === "" || hikeFormat === "loop"
        ? (endLocation = start)
        : (endLocation = end);
      const response = await axios.post(`${apiUrl}/hikes/create`, {
        title,
        description,
        countryRef: country,
        seasonRefs: seasons.map(Number),
        startLocation: start,
        endLocation,
        coverImage: image,
        userId: 1,
      });
      dispatch(
        setHikeDetails({
          hikeId: response.data.id,
          title: response.data.title,
          description: response.data.description,
        })
      );
      props.nextStep();
      // dispatch(showMessageWithTimeout("success", true, "auction started"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        // dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        // dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => submitHike(values))}>
        <TextInput
          required
          label="Title"
          placeholder="my awesome hike"
          {...form.getInputProps("title", { withError: false })}
        />
        <TextInput
          required
          label="Description"
          placeholder="a short summary"
          {...form.getInputProps("description", { withError: false })}
        />
        <Select
          label="Country"
          placeholder="Country"
          data={countriesEmoji}
          required
          searchable
          {...form.getInputProps("country", { withError: false })}
        />
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
        <TextInput
          placeholder="such and such trailhead"
          label="Start location"
          required
          {...form.getInputProps("start", { withError: false })}
        />
        <TextInput
          placeholder="such and such trailhead"
          label="End location"
          disabled={hikeFormat === "loop" ? true : false}
          required={hikeFormat === "loop" ? false : true}
          {...form.getInputProps("end", { withError: false })}
        />
        <TextInput
          placeholder="a scenic picture"
          label="Cover Image"
          {...form.getInputProps("image", { withError: false })}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

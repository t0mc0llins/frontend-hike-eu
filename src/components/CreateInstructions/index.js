import { Box, Divider, Space, Text, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectPage, selectStepper } from "../../store/appState/selectors";

export function CreateInstructions() {
  const page = useSelector(selectPage);
  const stepper = useSelector(selectStepper);

  return (
    <Box
      style={{
        display: page === "create" && stepper === 1 ? "block" : "none",
      }}
      mt={100}
      p={5}
    >
      <Title order={3}>Map instructions</Title>
      <Space h="md" />
      <Title order={5}>Step 1</Title>
      <Space h="sm" />
      <Text>
        Move and zoom the map to your desired default view. Click "set map" to
        fix this view.
      </Text>
      <Space h="md" />
      <Divider size="xs" />
      <Space h="sm" />
      <Title order={5}>Step 2</Title>
      <Space h="sm" />
      <Text>
        Click the "polyline measure" button on the side of the map to add
        navigation lines. Add as many of these as you like.
      </Text>
      <Space h="md" />
      <Divider size="xs" />
      <Space h="sm" />
      <Title order={5}>Step 3</Title>
      <Space h="sm" />
      <Text>
        When you are happy with you map and your route press "save map" and then
        you will be able to move to the next step.
      </Text>
    </Box>
  );
}

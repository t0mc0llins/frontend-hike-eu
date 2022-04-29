import { Box, Divider, Navbar, Space, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectPage } from "../../store/appState/selectors";
import CountrySelect from "../CountrySelect";
import DaySelect from "../DaySelect";
import SeasonSelect from "../SeasonSelect";

export default function FilterPane() {
  const page = useSelector(selectPage);

  return (
    <div style={{ display: page === "home" ? "block" : "none" }}>
      <Navbar.Section>
        <Box pb={30} pt={30} pl={10} pr={10} mt={50}>
          <Title order={3}>Filters</Title>
          <Space h="sm" />
          <Divider size="xs" />
          <Space h="md" />
          <Title order={5}>Country</Title>
          <Space h="md" />
          <CountrySelect />
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <Box pb={30} pl={10} pr={10}>
          <Divider size="xs" />
          <Space h="md" />
          <Title order={5}>Seasons</Title>
          <Space h="md" />
          <SeasonSelect />
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <Box pb={20} pl={10} pr={10}>
          <Divider size="xs" />
          <Space h="md" />
          <Title order={5}>Duration</Title>
          <Space h="md" />
          <DaySelect />
          <Space h="lg" />
          <Divider size="xs" />
        </Box>
      </Navbar.Section>
    </div>
  );
}

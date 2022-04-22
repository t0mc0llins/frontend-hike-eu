import { Box, Navbar, Title } from "@mantine/core";
import CountrySelect from "../CountrySelect";
import DaySelect from "../DaySelect";
import SeasonSelect from "../SeasonSelect";

export default function FilterPane() {
  return (
    <>
      <Navbar.Section>
        <Box pb={30} pt={30} pl={10} pr={10} mt={50}>
          <Title order={4}>Country</Title>
          <CountrySelect />
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <Box pb={30} pl={10} pr={10}>
          <Title order={4}>Seasons</Title>
          <SeasonSelect />
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <Box pb={20} pl={10} pr={10}>
          <Title order={4}>Duration</Title>
          <DaySelect />
        </Box>
      </Navbar.Section>
    </>
  );
}

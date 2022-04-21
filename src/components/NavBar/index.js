import { Box, Navbar } from "@mantine/core";
import CountrySelect from "../CountrySelect";
import DaySelect from "../DaySelect";
import SeasonSelect from "../SeasonSelect";

export default function NavBar() {
  return (
    <Navbar p="xs" width={{ base: 270 }} height={"100%"} style={{ zIndex: 0 }}>
      <Navbar.Section>
        <Box pb={10} pt={5} pl={10} pr={10} mt={50}>
          <h4>Country</h4>
          <CountrySelect />
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <Box pb={10} pl={10} pr={10}>
          <h4>Seasons</h4>
          <SeasonSelect />
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <Box pb={10} pl={10} pr={10}>
          <h4>Duration</h4>
          <DaySelect />
        </Box>
      </Navbar.Section>
    </Navbar>
  );
}

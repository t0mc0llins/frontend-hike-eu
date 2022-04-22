import { Navbar } from "@mantine/core";
import FilterPane from "../FilterPane";

export default function NavBar() {
  return (
    <Navbar p="xs" width={{ base: 270 }} height={"100%"} style={{ zIndex: 0 }}>
      <FilterPane />
    </Navbar>
  );
}

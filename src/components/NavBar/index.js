import { Navbar } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectPage } from "../../store/appState/selectors";
import FilterPane from "../FilterPane";
import { HikeContents } from "../HikeContents";

export default function NavBar() {
  const page = useSelector(selectPage);

  if (page === "home") {
    return (
      <Navbar
        p="xs"
        width={{ base: 270 }}
        height={"100%"}
        style={{ zIndex: 0 }}
      >
        <FilterPane />
      </Navbar>
    );
  } else if (page === "hike") {
    <Navbar p="xs" width={{ base: 0 }} height={"100%"} style={{ zIndex: 0 }}>
      <HikeContents />
    </Navbar>;
  }
}

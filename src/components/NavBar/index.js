import { Navbar } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectPage } from "../../store/appState/selectors";
import FilterPane from "../FilterPane";
import { HikeContents } from "../HikeContents";

export default function NavBar() {
  const page = useSelector(selectPage);

  return (
    <Navbar
      p="xs"
      width={{ base: page === "hike" ? 330 : 270 }}
      height={"100%"}
      style={{ zIndex: 0 }}
    >
      <FilterPane />
      <HikeContents />
    </Navbar>
  );
}

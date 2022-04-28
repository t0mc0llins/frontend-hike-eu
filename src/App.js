import {
  AppShell,
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { TopBar } from "./components/TopBar";
import { links } from "./components/TopBar/links";
import HikePage from "./pages/HikePage";
import HomePage from "./pages/Home";
import { getUserWithStoredToken } from "./store/user/actions";
import "./App.css";
import CreatePage from "./pages/CreatePage";

function App() {
  const dispatch = useDispatch();
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          padding="md"
          fixed
          navbar={<NavBar />}
          header={<TopBar links={links} />}
          styles={(theme) => ({
            main: {
              marginTop: 57,
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hike/:id" element={<HikePage />} />
            <Route path="/hike/create" element={<CreatePage />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;

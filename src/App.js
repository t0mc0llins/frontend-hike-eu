import { AppShell, MantineProvider, ColorSchemeProvider } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { TopBar } from "./components/TopBar";
import HikePage from "./pages/HikePage";
import HomePage from "./pages/Home";
import { getUserWithStoredToken } from "./store/user/actions";
import "./App.css";
import CreatePage from "./pages/CreatePage";
import { loggedInLinks } from "./components/TopBar/loggedInLinks";
import { selectToken } from "./store/user/selectors";
import { loggedOutLinks } from "./components/TopBar/loggedOutLinks";
import { setDarkMode } from "./store/appState/actions";

function App() {
  const dispatch = useDispatch();
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  useEffect(() => {
    const dark = localStorage.getItem("darkMode");
    if (!dark) {
      localStorage.setItem("darkMode", "light");
      dispatch(setDarkMode("light"));
      setColorScheme("light");
    }
    if (dark === "dark") {
      setColorScheme("dark");
      dispatch(setDarkMode("dark"));
    } else {
      setColorScheme("light");
      dispatch(setDarkMode("light"));
    }
  }, []);

  const links = token ? loggedInLinks : loggedOutLinks;

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

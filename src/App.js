import { AppShell } from "@mantine/core";
import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
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
  );
}

export default App;

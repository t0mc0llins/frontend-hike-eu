import React from "react";
import {
  createStyles,
  Switch,
  Group,
  useMantineColorScheme,
} from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { setDarkMode } from "../../store/appState/actions";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    "& *": {
      cursor: "pointer",
    },
  },

  icon: {
    pointerEvents: "none",
    position: "absolute",
    zIndex: 1,
    top: 3,
  },

  iconLight: {
    left: 4,
    color: theme.white,
  },

  iconDark: {
    right: 4,
    color: theme.colors.gray[6],
  },
}));

export function DarkMode() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (colorScheme === "dark") {
      toggleColorScheme();
      dispatch(setDarkMode("light"));
      localStorage.setItem("darkMode", "light");
    } else {
      toggleColorScheme();
      dispatch(setDarkMode("dark"));
      localStorage.setItem("darkMode", "dark");
    }
  };

  return (
    <Group position="center" my={30}>
      <div className={classes.root}>
        <Sun className={cx(classes.icon, classes.iconLight)} size={18} />
        <MoonStars className={cx(classes.icon, classes.iconDark)} size={18} />
        <Switch onChange={() => toggleTheme()} size="md" />
      </div>
    </Group>
  );
}

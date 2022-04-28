import React from "react";
import {
  createStyles,
  Switch,
  Group,
  useMantineColorScheme,
} from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/appState/actions";
import { selectDarkMode } from "../../store/appState/selectors";

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
  const darkMode = useSelector(selectDarkMode);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
    toggleColorScheme();
    localStorage.setItem("darkMode", darkMode);
  };

  return (
    <Group position="center" my={30}>
      <div className={classes.root}>
        <Sun className={cx(classes.icon, classes.iconLight)} size={18} />
        <MoonStars className={cx(classes.icon, classes.iconDark)} size={18} />
        <Switch
          checked={colorScheme === "dark"}
          onChange={() => toggleTheme()}
          size="md"
        />
      </div>
    </Group>
  );
}

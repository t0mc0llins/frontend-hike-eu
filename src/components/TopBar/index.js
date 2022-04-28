import React, { forwardRef, useEffect, useState } from "react";
import { createStyles, Header, Autocomplete, Group, Text } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { ReactComponent as Logo } from "../../images/logo-hike.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchableHikes } from "../../store/hike/selectors";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "../LoggedIn";
import LoggedOut from "../LoggedOut";
import { Link } from "react-router-dom";
import { selectPage } from "../../store/appState/selectors";
import { setSearchFilter } from "../../store/filter/actions";
import { DarkMode } from "../DarkMode";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  userMenu: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

export function TopBar({ links }) {
  const { classes } = useStyles();
  const searchData = useSelector(selectSearchableHikes);
  const [search, setSearch] = useState("");
  const token = useSelector(selectToken);
  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchFilter(search));
  }, [search, dispatch]);

  const items = links.map((link) => (
    <a key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </a>
  ));

  const AutoCompleteItem = forwardRef(({ value, country, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{value}</Text>
          <Text size="xs" color="dimmed">
            {country}
          </Text>
        </div>
      </Group>
    </div>
  ));

  return (
    <Header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Link to={"/"}>
            <Logo style={{ width: 80, height: 57 }} />
          </Link>
        </Group>
        <Group>
          <Autocomplete
            style={{ display: page === "home" ? "block" : "none" }}
            className={classes.search}
            placeholder="Search"
            value={search}
            onChange={setSearch}
            icon={<Search size={16} />}
            itemComponent={AutoCompleteItem}
            data={searchData}
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.country.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Group>
        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          {loginLogoutControls}
          <DarkMode />
        </Group>
      </div>
    </Header>
  );
}

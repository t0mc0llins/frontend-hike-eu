import React, { forwardRef, useState } from "react";
import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Avatar,
  UnstyledButton,
  Text,
  Menu,
  Divider,
} from "@mantine/core";
import {
  Logout,
  Heart,
  Star,
  Message,
  Settings,
  PlayerPause,
  Trash,
  SwitchHorizontal,
  ChevronDown,
  Search,
} from "tabler-icons-react";
import { ReactComponent as Logo } from "../../images/logo-hike.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectSearchableHikes } from "../../store/hike/selectors";

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
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = useSelector(selectUser);
  const searchData = useSelector(selectSearchableHikes);
  const [search, setSearch] = useState("");

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  const AutoCompleteItem = forwardRef(({ value, country }, ref) => (
    <div ref={ref}>
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
          <Logo style={{ width: 80, height: 57 }} />
        </Group>
        <Group>
          <Autocomplete
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
          <Menu
            size={260}
            placement="end"
            transition="pop-top-right"
            className={classes.userMenu}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            control={
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius="xl"
                    size={20}
                  />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user.name}
                  </Text>
                  <ChevronDown size={12} />
                </Group>
              </UnstyledButton>
            }
          >
            <Menu.Item icon={<Heart size={14} color={theme.colors.red[6]} />}>
              Liked posts
            </Menu.Item>
            <Menu.Item icon={<Star size={14} color={theme.colors.yellow[6]} />}>
              Saved posts
            </Menu.Item>
            <Menu.Item
              icon={<Message size={14} color={theme.colors.blue[6]} />}
            >
              Your comments
            </Menu.Item>

            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<Settings size={14} />}>
              Account settings
            </Menu.Item>
            <Menu.Item icon={<SwitchHorizontal size={14} />}>
              Change account
            </Menu.Item>
            <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>

            <Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<PlayerPause size={14} />}>
              Pause subscription
            </Menu.Item>
            <Menu.Item color="red" icon={<Trash size={14} />}>
              Delete account
            </Menu.Item>
          </Menu>
        </Group>
      </div>
    </Header>
  );
}

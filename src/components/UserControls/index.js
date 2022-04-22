import React, { useState } from "react";
import {
  Avatar,
  UnstyledButton,
  Group,
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
} from "tabler-icons-react";
import { useBooleanToggle } from "@mantine/hooks";

export default function UserControls() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, theme, cx } = useSty();
  return (
    <Menu
      size={260}
      placement="end"
      transition="pop-top-right"
      className={classes.userMenu}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      control={
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group spacing={7}>
            <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
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
      <Menu.Item icon={<Message size={14} color={theme.colors.blue[6]} />}>
        Your comments
      </Menu.Item>

      <Menu.Label>Settings</Menu.Label>
      <Menu.Item icon={<Settings size={14} />}>Account settings</Menu.Item>
      <Menu.Item icon={<SwitchHorizontal size={14} />}>
        Change account
      </Menu.Item>
      <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>

      <Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item icon={<PlayerPause size={14} />}>Pause subscription</Menu.Item>
      <Menu.Item color="red" icon={<Trash size={14} />}>
        Delete account
      </Menu.Item>
    </Menu>
  );
}

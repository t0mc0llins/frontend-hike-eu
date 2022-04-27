import React, { useState } from "react";
import { createStyles, Box, Text, Group } from "@mantine/core";
import { ListSearch } from "tabler-icons-react";
import { useSelector } from "react-redux";
import { selectCurrentHike } from "../../store/hike/selectors";
import { selectPage } from "../../store/appState/selectors";

const LINK_HEIGHT = 38;
const INDICATOR_SIZE = 10;
const INDICATOR_OFFSET = (LINK_HEIGHT - INDICATOR_SIZE) / 2;

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "block",
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    lineHeight: `${LINK_HEIGHT}px`,
    fontSize: theme.fontSizes.sm,
    height: LINK_HEIGHT,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
  },

  links: {
    position: "relative",
  },

  indicator: {
    transition: "transform 150ms ease",
    border: `2px solid ${
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE,
    position: "absolute",
    left: -INDICATOR_SIZE / 2 + 1,
  },
}));

export function HikeContents() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(2);
  const hike = useSelector(selectCurrentHike);
  const page = useSelector(selectPage);
  if (hike.days) {
    let links = [];

    for (let i = 0; hike.days.length > i; i++) {
      let currentDay = {
        label: hike.days[i].title,
        link: `#${hike.days[i].title}`,
        order: 1,
      };
      links.push(currentDay);
      for (let j = 0; hike.days[i].stages.length > j; j++) {
        let currentStage = {
          label: hike.days[i].stages[j].title,
          link: `#${hike.days[i].stages[j].title}`,
          order: 2,
        };
        links.push(currentStage);
      }
    }

    const items = links.map((item, index) => (
      <Box
        component="a"
        href={item.link}
        onClick={(event) => {
          setActive(index);
        }}
        key={index}
        className={cx(classes.link, { [classes.linkActive]: active === index })}
        sx={(theme) => ({ paddingLeft: item.order * theme.spacing.lg })}
      >
        {item.label}
      </Box>
    ));

    return (
      <div style={{ display: page === "hike" ? "block" : "none" }}>
        <Group mb="md">
          <ListSearch size={18} />
          <Text>Table of contents</Text>
        </Group>
        <div className={classes.links}>
          <div
            className={classes.indicator}
            style={{
              transform: `translateY(${
                active * LINK_HEIGHT + INDICATOR_OFFSET
              }px)`,
            }}
          />
          {items}
        </div>
      </div>
    );
  }
}

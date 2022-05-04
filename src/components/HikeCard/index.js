import React from "react";
import { Heart } from "tabler-icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    minWidth: 300,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  descriptionSection: {
    minHeight: 200,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  badgeSection: {
    minHeight: 70,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export function HikeCard({ image, title, description, country, badges, id }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const features = badges.map((badge) => (
    <Badge
      color={theme.colorScheme === "dark" ? "dark" : "gray"}
      key={badge.label}
      leftSection={badge.emoji}
    >
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.descriptionSection} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {title}
          </Text>
          <Badge size="sm">{country.label}</Badge>
        </Group>
        <Text size="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.badgeSection}>
        <Text mt="md" className={classes.label} color="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button
          radius="md"
          onClick={() => {
            navigate(`/hike/${id}`);
          }}
          style={{ flex: 1 }}
        >
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <Heart size={18} className={classes.like} />
        </ActionIcon>
      </Group>
    </Card>
  );
}

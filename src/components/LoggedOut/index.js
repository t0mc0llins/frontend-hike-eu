import { useState } from "react";
import React from "react";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Modal,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { login, signUp } from "../../store/user/actions";

export default function LoggedOut() {
  const [opened, setOpened] = useState(false);
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            Welcome to Hike EU, please {type}.
          </Text>

          <form
            onSubmit={
              type === "register"
                ? form.onSubmit((values) => {
                    dispatch(signUp(values));
                  })
                : form.onSubmit((values) => {
                    dispatch(login(values));
                  })
            }
          >
            <Group direction="column" grow>
              {type === "register" && (
                <TextInput
                  required
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                />
              )}

              <TextInput
                required
                label="Email"
                placeholder="example@gmail.com"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
              />
            </Group>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                color="gray"
                onClick={() => toggle()}
                size="xs"
              >
                {type === "register"
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </Anchor>
              <Button type="submit">{upperFirst(type)}</Button>
            </Group>
          </form>
        </Paper>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Login</Button>
      </Group>
    </>
  );
}

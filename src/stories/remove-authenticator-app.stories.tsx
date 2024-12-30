import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";

import { RemoveAuthenticatorApp } from "@components/two-factor-auth-elements/remove-authenticator-app";

const meta = {
  title: "TwoFA/RemoveAuthenticatorApp",
  component: RemoveAuthenticatorApp,
} satisfies Meta<typeof RemoveAuthenticatorApp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    email: "om@gmail.com",
  },
};

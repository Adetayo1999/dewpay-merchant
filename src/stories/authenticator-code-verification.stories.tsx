import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";

import { AuthenticatorCodeVerification } from "@components/two-factor-auth-elements/authenticator-code-verification";

const meta = {
  title: "TwoFA/AuthenticationCodeVerification",
  component: AuthenticatorCodeVerification,
} satisfies Meta<typeof AuthenticatorCodeVerification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

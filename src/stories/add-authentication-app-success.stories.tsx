import { AddAuthenticatorAppSuccess } from "@components/two-factor-auth-elements/add-authenticator-app-success";
import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "TwoFA/AddAuthenticationAppSuccess",
  component: AddAuthenticatorAppSuccess,
} satisfies Meta<typeof AddAuthenticatorAppSuccess>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

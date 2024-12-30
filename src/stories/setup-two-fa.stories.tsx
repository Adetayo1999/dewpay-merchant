import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";

import { TwoFaSetup } from "@components/two-factor-auth-elements/two-fa-setup";

const meta = {
  title: "TwoFA/Setup Two FA",
  component: TwoFaSetup,
} satisfies Meta<typeof TwoFaSetup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

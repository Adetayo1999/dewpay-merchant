import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";

import { SetupTwoFaEmail } from "@components/two-factor-auth-elements/setup-two-fa-email";

const meta = {
  title: "TwoFA/TwoFaSetupForEmail",
  component: SetupTwoFaEmail,
} satisfies Meta<typeof SetupTwoFaEmail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    email: "om@gmail.com",
  },
};

import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";

import { SetupTwoFaPhone } from "@components/two-factor-auth-elements/setup-twofa-phone";

const meta = {
  title: "TwoFA/TwoFaSetupForPhone",
  component: SetupTwoFaPhone,
} satisfies Meta<typeof SetupTwoFaPhone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    phone: "+2349070750432",
  },
};

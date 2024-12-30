import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";

import { EmailVerificationOTP } from "@components/two-factor-auth-elements/email-verification-otp";

const meta = {
  title: "TwoFA/Email Verification OTP",
  component: EmailVerificationOTP,
} satisfies Meta<typeof EmailVerificationOTP>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    email: "om@gmail.com",
  },
};

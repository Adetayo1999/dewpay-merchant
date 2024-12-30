import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";

import { TwoStepVerificationQR } from "@components/two-factor-auth-elements/two-step-verification-qr";
import { BrowserRouter } from "react-router-dom";

const ModifiedComponent = () => (
  <BrowserRouter>
    {" "}
    <TwoStepVerificationQR />{" "}
  </BrowserRouter>
);

const meta = {
  title: "TwoFA/TwoStepVerificationQR",
  component: ModifiedComponent,
} satisfies Meta<typeof ModifiedComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

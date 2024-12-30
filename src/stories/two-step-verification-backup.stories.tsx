import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { TwoStepVerificationBackup } from "@components/two-factor-auth-elements/two-step-verification-backup";

const ModifiedComponent = () => (
  <BrowserRouter>
    {" "}
    <TwoStepVerificationBackup />{" "}
  </BrowserRouter>
);

const meta = {
  title: "TwoFA/TwoStepVerificationBackup",
  component: ModifiedComponent,
} satisfies Meta<typeof ModifiedComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

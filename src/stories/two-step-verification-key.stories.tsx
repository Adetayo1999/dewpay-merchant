import "../index.css";
import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { TwoStepVerificationKey } from "@components/two-factor-auth-elements/two-step-verification-key";

const ModifiedComponent = () => (
  <BrowserRouter>
    {" "}
    <TwoStepVerificationKey />{" "}
  </BrowserRouter>
);

const meta = {
  title: "TwoFA/TwoStepVerificationKey",
  component: ModifiedComponent,
} satisfies Meta<typeof ModifiedComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

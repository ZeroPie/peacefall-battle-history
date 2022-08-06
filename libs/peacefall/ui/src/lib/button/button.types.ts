import { ButtonVariants } from "./button.styles";
import  Stitches from "@stitches/react";
import React from 'react'

export type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  css?: Stitches.CSS;
} & ButtonVariants &
  React.ComponentPropsWithoutRef<"button">;

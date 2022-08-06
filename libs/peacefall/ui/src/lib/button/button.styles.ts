import type * as Stitches from "@stitches/react";
import { styled } from '../../stitches.config';

export const Button = styled("button", {
  display: "flex",
  height: "44px",
  width: "fit-content",
  alignItems: "center",
  backgroundColor: "$green6",
  borderRadius: "$6",
  color: "$green12",
  fontSize: "$16",
  border: "$default",
  boxShadow: "$8",
  lineHeight: "$16",
  padding: "$12 $16",
  cursor: "pointer",
  "&:active": {
    backgroundColor: "$green8",
    color: "$green12",
  },
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  variants: {
    variant: {
      primary: {
        "&:hover:enabled": {
          boxShadow: "$20",
          backgroundColor: "$green7",
        },
        backgroundColor: "$green6",
      },
      secondary: {
        color: "$green10",
        backgroundColor: "$white",
        border: "1px solid $green10",
        "&:hover": {
          backgroundColor: "$green5",
          boxShadow: "$20",
        },
      },
      google: {
        color: "$gray11",
        backgroundColor: "white",
        "&:hover": {
          boxShadow: "$20",
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export const Icon = styled("i", {
  display: "flex",
  maxHeight: "$fontHeights$16",
});

export type ButtonVariants = Stitches.VariantProps<typeof Button>;

import React from "react";
import * as S from "./button.styles";
import { ButtonProps } from './button.types';

export const Button = ({ text, icon, ...props }: ButtonProps) => (
  <S.Button {...props}>
    {icon && <S.Icon>{icon}</S.Icon>}
    {text}
  </S.Button>
);

export default Button;

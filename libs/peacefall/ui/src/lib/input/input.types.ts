import Stitches from '@stitches/react';
import { ComponentPropsWithRef } from 'react';

export type InputType = {
  type:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
};

export type InputProps = ComponentPropsWithRef<'input'> & {
  type?: InputType['type'];
  error?: string;
  label?: string | React.ReactNode;
  validate?: (value: string) => void;
  css?: Stitches.CSS;
};

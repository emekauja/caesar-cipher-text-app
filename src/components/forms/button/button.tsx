import { ButtonHTMLAttributes, forwardRef, ReactNode, RefObject } from 'react';
import {
  // classnames,
  TJustifyContent,
  TFontWeight,
} from 'tailwindcss-classnames';
import cw from 'classnames';
import { clsx as classnames } from 'clsx';
//Base
const baseClass = classnames('rounded-full', 'text-black', 'cursor-pointer');
//Filled Schemes
const filledClass = classnames('bg-black', 'text-white');
//Outline Schemes
const outlineClass = classnames('border', 'border-gray-50');
//Flat Schemes
const flatClass = classnames('bg-gray-50');

const smallTxt = classnames('text-sm');
const mediumTxt = classnames(
  'text-base',
  'py-3',
  'pl-[1.875rem]',
  'pr-[1.875rem]'
);
const largeTxt = classnames('text-base', 'py-3.5', 'px-[28px]', 'h-[52px]');
//Rounded
const roundedFullBtn = classnames('rounded-full');
//Status
const flexCenter = classnames(
  'inline-flex',
  'items-center',
  'justify-center',
  'space-x-2'
);
const disabledBtn = classnames('opacity-20', 'cursor-not-allowed');
//full width
const fullWidth = classnames('w-full');
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'filled' | 'border' | 'flat';
  size?: 'xs' | 'xxs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  rounded?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isFull?: boolean;
  justifyContent?: TJustifyContent;
  fontWeight?: TFontWeight;
}
export const Button = forwardRef<unknown, IButtonProps>(
  (
    {
      text,
      variant = 'filled',
      size = 'md',
      disabled,
      rounded,
      leftIcon,
      rightIcon,
      isFull,
      justifyContent,
      fontWeight = 'font-medium',
      className,
      ...props
    },
    ref
  ) => {
    const btnClass = classnames(baseClass, fontWeight, justifyContent, {
      [filledClass]: variant === 'filled',
      [outlineClass]: variant === 'border',
      [flatClass]: variant === 'flat',
      [smallTxt]: size == 'sm',
      [mediumTxt]: size == 'md',
      [largeTxt]: size == 'lg',

      [disabledBtn]: disabled,
      [roundedFullBtn]: !!rounded,
      [flexCenter]: (!!leftIcon || rightIcon) && !!text ? true : false,
      [fullWidth]: isFull,
    });
    return (
      <button
        {...props}
        className={cw(btnClass, className)}
        disabled={disabled}
        ref={ref as RefObject<HTMLButtonElement>}
      >
        {!!leftIcon && leftIcon}
        {text ? <span>{text}</span> : null}
        {!!rightIcon && rightIcon}
      </button>
    );
  }
);

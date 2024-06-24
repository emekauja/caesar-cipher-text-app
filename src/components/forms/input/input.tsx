import * as React from 'react';

import classNames from 'classnames';
import { TBackgroundColor } from 'tailwindcss-classnames';

// full width
const fullWidth = classNames('w-full');

// bare-bones variant
const bareBonesVariant = classNames(
  'text-sm',
  'text-black',
  'border-none',
  'rounded-none',
  'py-0',
  'px-0',
  'focus:outline-0',
  'focus:ring-0',
  'place-holder:text-gray-900',
  'flex-1'
  // 'bg-black'
);

export interface IInputProps extends React.ComponentPropsWithRef<'input'> {
  rightElement?: React.ReactElement;
  leftElement?: React.ReactElement;
  isFullWidth?: boolean;
  bgColor?: TBackgroundColor;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ isFullWidth = true, bgColor, ...props }, ref) => {
    const inputBareBoneClass = classNames(bareBonesVariant, bgColor, {
      [fullWidth]: isFullWidth,
    });

    return <input ref={ref} {...props} className={inputBareBoneClass} />;
  }
);

export const InputLabelWWrapper = ({
  label,
  name,
  children,
}: React.PropsWithChildren<{
  name?: string;
  label: string;
}>) => {
  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor={name} className="text-base font-semibold leading-6">
        {label}
      </label>
      {children}
    </div>
  );
};

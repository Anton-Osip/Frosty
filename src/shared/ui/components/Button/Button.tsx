import type { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './Button.module.css';

type Variant = 'dark' | 'accent';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
  hoverColor?: string;
  borderRadius?: string | number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = 'dark',
  size = 'md',
  fullWidth = false,
  className,
  backgroundColor,
  width,
  height,
  hoverColor,
  borderRadius,
  style,
  ...rest
}: ButtonProps) => {
  const rootClassName = [s.button, s[variant], s[size], fullWidth ? s.fullWidth : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  const buttonStyle = {
    ...style,
    ...(backgroundColor && { backgroundColor }),
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(borderRadius && { borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }),
    ...(hoverColor && ({ '--hover-bg-color': hoverColor } as React.CSSProperties)),
  };

  return (
    <button type='button' className={rootClassName} style={buttonStyle} {...rest}>
      {children}
    </button>
  );
};

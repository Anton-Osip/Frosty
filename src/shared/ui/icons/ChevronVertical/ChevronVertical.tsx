import type { SVGProps } from 'react';
import s from './ChevronVertical.module.css';

export type ChevronButtonProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const ChevronVertical = ({ size = 8, className = '', ...props }: ChevronButtonProps) => {
  const height = (size * 14) / 8;

  return (
    <svg
      width={size}
      height={height}
      viewBox='0 0 8 14'
      xmlns='http://www.w3.org/2000/svg'
      className={`${s.chevron} ${className}`}
      {...props}
    >
      <path
        d='M1 1l6 6-6 6'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

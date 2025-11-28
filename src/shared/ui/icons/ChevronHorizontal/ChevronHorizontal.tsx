import type { SVGProps } from 'react';
import s from './ChevronHorizontal.module.css';

export type ChevronHorizontalProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const ChevronHorizontal = ({ size = 14, className = '', ...props }: ChevronHorizontalProps) => {
  return (
    <svg
      width={size}
      height={(size * 8) / 14}
      viewBox='0 0 14 8'
      xmlns='http://www.w3.org/2000/svg'
      className={`${s.chevron} ${className}`}
      {...props}
    >
      <path
        d='M1 1l6 6 6-6'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

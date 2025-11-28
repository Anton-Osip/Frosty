import type { SVGProps } from 'react';
import s from './SearchIcon.module.css';

export type SearchIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const SearchIcon = ({ size = 19, className = '', ...props }: SearchIconProps) => {
  return (
    <svg width={size} height={size} viewBox='0 0 19 19' className={`${s.icon} ${className}`} {...props}>
      <path
        d='M12.508 11.962a5.284 5.284 0 10-.546.546l3.424 3.423a.386.386 0 00.546-.546zM8.255 13.758a5.503 5.503 0 115.503-5.503 5.509 5.509 0 01-5.503 5.503z'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

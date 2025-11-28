import type { SVGProps } from 'react';

type FrostyLogoProps = {
  size?: number;
} & SVGProps<SVGSVGElement>;

export const FrostyLogo = ({ size = 25, ...props }: FrostyLogoProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={(size * 22) / 25}
      viewBox='0 0 25 22'
      fill='none'
      {...props}
    >
      <path
        d='M25 0H0L4.66252 9.39806L6.66075 4.82718H21.4476C22.6085 4.82718 22.9722 4.00129 23.2238 3.58835L25 0Z'
        fill='currentColor'
      />
      <path
        d='M14.5204 7.26214H8.57016L4.66252 15.7631L7.68206 22L11.1012 14.6951H16.5394C17.6116 14.6951 18.3393 13.8408 18.6501 13.4136L20.3819 9.73981H13.3659L14.5204 7.26214Z'
        fill='currentColor'
      />
    </svg>
  );
};

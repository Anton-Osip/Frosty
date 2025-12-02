import s from './ChevronVertical.module.css';

export const ChevronVertical = ({ className = '', ...props }) => {
  return (
    <svg
      width='10'
      height='20'
      viewBox='0 0 8 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${s.chevron} ${className}`}
      {...props}
    >
      <g clipPath='url(#clip0_411_271)'>
        <path
          d='M1.00001 1L7 6.99995L1 13'
          stroke='targetColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_411_271'>
          <rect width='14' height='8' fill='white' transform='matrix(0 -1 1 0 0 14)' />
        </clipPath>
      </defs>
    </svg>
  );
};

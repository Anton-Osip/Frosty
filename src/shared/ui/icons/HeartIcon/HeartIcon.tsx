import s from './HeartIcon.module.css';

type HeartType = 'light' | 'dark';

type HeartIconProps = {
  type?: HeartType;
  className?: string;
}

export function HeartIcon({ type = 'dark', className }: HeartIconProps) {
  const variantClassName = type === 'light' ? s.light : s.dark;

  const rootClassName = [s.heartIcon, variantClassName, className ?? ''].filter(Boolean).join(' ');

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={rootClassName}
    >
      <path d='M16.44 3.10001C14.63 3.10001 13.01 3.98001 12 5.33001C10.99 3.98001 9.37 3.10001 7.56 3.10001C4.49 3.10001 2 5.60001 2 8.69001C2 9.88001 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.88001 22 8.69001C22 5.60001 19.51 3.10001 16.44 3.10001Z' />
    </svg>
  );
}

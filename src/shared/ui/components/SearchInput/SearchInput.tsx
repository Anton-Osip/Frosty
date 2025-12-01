import s from './SearchInput.module.css';
import { SearchIcon } from '../../icons';
import type { InputHTMLAttributes } from 'react';

type SearchInputProps = {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

export const SearchInput = ({ className, placeholder = 'Поиск', value, onChange, ...props }: SearchInputProps) => {
  const rootClassName = className ? `${s.root} ${className}` : s.root;

  return (
    <label className={rootClassName}>
      <span className={s.iconWrapper} aria-hidden='true'>
        <SearchIcon />
      </span>
      <input
        className={s.input}
        type='search'
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        {...props}
      />
    </label>
  );
};

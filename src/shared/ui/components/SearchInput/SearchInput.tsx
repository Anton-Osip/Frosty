import { useState } from 'react';
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
  const [isFocused, setIsFocused] = useState(false);
  const rootClassName = className ? `${s.root} ${className}` : s.root;
  const inputClassName = isFocused ? `${s.input} ${s.inputFocused}` : s.input;

  return (
    <label className={rootClassName}>
      <span className={s.iconWrapper} aria-hidden='true'>
        <SearchIcon />
      </span>
      <input
        className={inputClassName}
        type='search'
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </label>
  );
};

import s from './SearchInput.module.css';
import { SearchIcon } from '../../icons';

type SearchInputProps = {
  className?: string;
  placeholder?: string;
};

export const SearchInput = ({ className, placeholder = 'Поиск' }: SearchInputProps) => {
  const rootClassName = className ? `${s.root} ${className}` : s.root;

  return (
    <label className={rootClassName}>
      <span className={s.iconWrapper} aria-hidden='true'>
        <SearchIcon />
      </span>
      <input className={s.input} type='search' placeholder={placeholder} aria-label={placeholder} />
    </label>
  );
};

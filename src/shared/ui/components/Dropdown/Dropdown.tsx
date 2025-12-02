import { useEffect, useRef, useState } from 'react';
import s from './Dropdown.module.css';
import { ChevronHorizontal } from '../../icons';

type Option = {
  label: string;
  value: string;
  number?: number;
};

type DropdownProps = {
  options: Option[];
  value: string;
  onChange: (option: Option) => void;
  variant?: 'default' | 'hover';
  width?: number | string;
  height?: number | string;
  className?: string;
  scrollable?: boolean;
};

export const Dropdown = ({
  options,
  value,
  onChange,
  variant = 'default',
  height = 39,
  className,
  scrollable = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value) || options[0];

  const wrapperClassName = `${s.wrapper} ${s[variant]} ${className || ''}`.trim();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  const containerHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={wrapperClassName}
      style={{
        height: containerHeight,
      }}
      ref={dropdownRef}
    >
      <button
        className={s.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        style={{ height: containerHeight }}
      >
        <span className={s.label}>{selectedOption.label}</span>
        <span className={`${s.chevron} ${isOpen ? s.chevronOpen : ''}`} aria-hidden='true'>
          <ChevronHorizontal />
        </span>
      </button>

      <div
        className={`${s.listWrapper} ${isOpen ? s.open : ''} ${scrollable ? s.listScrollable : ''}`.trim()}
        role='listbox'
      >
        <ul className={`${s.list} ${scrollable ? s.listScrollable : ''}`.trim()}>
          {options.map(option => {
            const isActive = option.value === value;

            return (
              <li key={option.value} role='option'>
                <button
                  className={`${s.option} ${isActive ? s.optionActive : ''}`}
                  onClick={() => handleOptionClick(option)}
                  type='button'
                  aria-selected={isActive}
                >
                  <span className={s.optionContent}>
                    <span className={s.optionRadio} aria-hidden='true' />
                    <span className={s.optionLabel}>{option.label}</span>
                    {option.number && <div className={s.optionNumber}>{option.number}</div>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

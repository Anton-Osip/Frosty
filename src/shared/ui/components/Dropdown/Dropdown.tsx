import {useEffect, useRef, useState} from 'react';
import s from './Dropdown.module.css';
import {ChevronHorizontal} from '../../icons';

type Option = {
    label: string;
    value: string;
};

type DropdownProps = {
    options: Option[];
    value: string;
    onChange: (option: Option) => void;
    variant?: 'default' | 'hover';
    width?: number | string;
    height?: number | string;
};

export const Dropdown = ({
                             options,
                             value,
                             onChange,
                             variant = 'default',
                             height = 38,
                         }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value) || options[0];

    const wrapperClassName = `${s.wrapper} ${s[variant]}`;

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
                style={{height: containerHeight}}
            >
                <span className={s.label}>{selectedOption.label}</span>
                <span className={`${s.chevron} ${isOpen ? s.chevronOpen : ''}`} aria-hidden='true'>
          <ChevronHorizontal/>
        </span>
            </button>

            <ul className={`${s.list} ${isOpen ? s.open : ''}`} role='listbox'>
                {options.map(option => (
                    <li key={option.value} role='option'>
                        <button
                            className={`${s.option} ${option.value === value ? s.optionActive : ''}`}
                            onClick={() => handleOptionClick(option)}
                            type='button'
                            aria-selected={option.value === value}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

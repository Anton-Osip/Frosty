import { useEffect, useState } from 'react';
import type { ButtonHTMLAttributes, KeyboardEvent } from 'react';
import s from './ToggleSwitch.module.css';

type ToggleSwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'onToggle'> & {
  isOn?: boolean;
  defaultOn?: boolean;
  onToggle?: (nextValue: boolean) => void;
  size?: 'sm' | 'md';
};

export function ToggleSwitch({
  isOn,
  defaultOn = false,
  onToggle,
  size = 'md',
  disabled,
  className,
  ...rest
}: ToggleSwitchProps) {
  const isControlled = typeof isOn === 'boolean';
  const [internalOn, setInternalOn] = useState<boolean>(isOn ?? defaultOn);

  useEffect(() => {
    if (typeof isOn === 'boolean') {
      // setInternalOn(isOn);
    }
  }, [isOn]);

  const currentOn = isControlled ? (isOn as boolean) : internalOn;

  const stateClassName = currentOn ? s.on : s.off;
  const sizeClassName = s[size];
  const disabledClassName = disabled ? s.disabled : '';

  const rootClassName = [s.toggle, stateClassName, sizeClassName, disabledClassName, className ?? '']
    .filter(Boolean)
    .join(' ');

  function handleClick() {
    if (disabled) return;

    const next = !currentOn;

    if (!isControlled) {
      setInternalOn(next);
    }

    if (onToggle) onToggle(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const next = !currentOn;

      if (!isControlled) {
        setInternalOn(next);
      }

      if (onToggle) onToggle(next);
    }
  }

  return (
    <button
      type='button'
      role='switch'
      aria-checked={isOn}
      aria-disabled={disabled}
      className={rootClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <span className={s.thumb} />
    </button>
  );
}

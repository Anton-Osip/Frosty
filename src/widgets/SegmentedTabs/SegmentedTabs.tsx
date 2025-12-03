import { useEffect, useRef } from 'react';
import s from './SegmentedTabs.module.css';

export type SegmentedTab = {
  label: string;
  value: string;
};

type Props = {
  tabs: SegmentedTab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const SegmentedTabs = ({ tabs, value, onChange, className }: Props) => {
  const wrapperClassName = [s.wrapper, className ?? ''].filter(Boolean).join(' ');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const activeIndex = tabs.findIndex(tab => tab.value === value);
    if (activeIndex === -1) return;

    const activeTab = tabRefs.current[activeIndex];
    const container = containerRef.current;
    if (!activeTab) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    const tabCenter = tabRect.left + tabRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const delta = tabCenter - containerCenter;

    container.scrollTo({
      left: container.scrollLeft + delta,
      behavior: 'smooth',
    });
  }, [tabs, value]);

  return (
    <div className={wrapperClassName}>
      <div className={s.root} ref={containerRef}>
        {tabs.map((tab, index) => {
          const isActive = tab.value === value;

          return (
            <button
              key={tab.value}
              type='button'
              className={`${s.tab} ${isActive ? s.tabActive : ''}`.trim()}
              onClick={() => onChange(tab.value)}
              ref={el => {
                tabRefs.current[index] = el;
              }}
            >
              <span className={s.label}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import { useEffect, useRef, type WheelEvent } from 'react';
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
  const rootClassName = [s.root, className ?? ''].filter(Boolean).join(' ');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const smoothScrollTo = (target: number) => {
    const container = containerRef.current;
    if (!container) return;

    const start = container.scrollLeft;
    const change = target - start;
    const duration = 320;
    const startTime = performance.now();

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(currentTime: number) {
      const currentContainer = containerRef.current;
      if (!currentContainer) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      currentContainer.scrollLeft = start + change * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const container = containerRef.current;
    const activeIndex = tabs.findIndex(tab => tab.value === value);
    const activeTab = tabRefs.current[activeIndex];

    if (!container || !activeTab) return;

    const containerWidth = container.clientWidth;
    const tabOffsetLeft = activeTab.offsetLeft;
    const tabWidth = activeTab.offsetWidth;

    const targetScrollLeft = tabOffsetLeft - containerWidth / 2 + tabWidth / 2;
    const maxScrollLeft = container.scrollWidth - containerWidth;

    const nextScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
    smoothScrollTo(nextScrollLeft);
  }, [tabs, value]);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      const target = container.scrollLeft + event.deltaY * 0.6;
      smoothScrollTo(target);
    }
  };

  return (
    <div className={rootClassName} ref={containerRef} onWheel={handleWheel}>
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
      <div className={s.fadeRight} aria-hidden='true' />
    </div>
  );
};

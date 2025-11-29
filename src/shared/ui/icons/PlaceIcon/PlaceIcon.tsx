import type { SVGProps } from 'react';
import type { CSSProperties } from 'react';

type PlaceIconProps = SVGProps<SVGSVGElement> & {
  text?: string | number;
  textColor?: string;
  width?: number | string;
  height?: number | string;
};

export const PlaceIcon = ({
  text = '1',
  textColor = '#FFC300',
  width = 128,
  height: heightProp,
  className,
  style,
  ...props
}: PlaceIconProps) => {
  const aspectRatio = 128 / 104;

  let svgStyle: CSSProperties | undefined;
  let svgWidth: number | string | undefined;
  let svgHeight: number | string | undefined;

  // Если высота задана явно
  if (heightProp !== undefined) {
    if (typeof width === 'string' || typeof heightProp === 'string') {
      // Для строковых значений используем ТОЛЬКО CSS стили, не устанавливаем атрибуты
      const heightValue = typeof heightProp === 'string' ? heightProp : `${heightProp}px`;
      const widthValue = typeof width === 'string' ? width : '100%';
      svgStyle = {
        width: widthValue,
        height: heightValue,
        display: 'block',
        minWidth: 0,
        flexShrink: 0,
        boxSizing: 'border-box',
        ...style,
      };
      // Не устанавливаем атрибуты width/height для строковых значений
      // Это заставит SVG использовать CSS стили
      svgWidth = undefined;
      svgHeight = undefined;
    } else {
      // Для числовых значений используем атрибуты
      svgWidth = width;
      svgHeight = heightProp;
      svgStyle = style;
    }
  } else if (typeof width === 'number') {
    // Если высота не задана и width - число, вычисляем высоту
    svgWidth = width;
    svgHeight = width / aspectRatio;
    svgStyle = style;
  } else {
    // Для строковых значений width (проценты, px, em и т.д.) используем aspect-ratio
    svgStyle = {
      aspectRatio: `${aspectRatio}`,
      width: typeof width === 'string' ? width : '100%',
      display: 'block',
      flexShrink: 0,
      ...style,
    };
    svgWidth = undefined;
    svgHeight = undefined;
  }

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox='0 0 128 104'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      style={svgStyle}
      {...props}
    >
      <rect x='40' width='48' height='4' rx='2' fill={textColor} />
      <path
        d='M20.7674 4.97299C22.6462 3.07069 25.2086 2 27.8823 2H100.118C102.791 2 105.354 3.07069 107.233 4.97299L128 26H0L20.7674 4.97299Z'
        fill='#354366'
      />
      <path d='M128 26H0V104H128V26Z' fill='#242D45' />
      <g filter='url(#filter0_d_1_722)'>
        <path d='M70.2964 2H56.7037L33 26H94.0001L70.2964 2Z' fill='#42547F' />
        <path
          d='M94.0001 26H33V75.0639C33 76.474 34.4201 77.4413 35.7322 76.925L62.0355 66.5762C62.9767 66.2059 64.0233 66.2059 64.9645 66.5762L91.2678 76.925C92.58 77.4413 94.0001 76.474 94.0001 75.0639V26Z'
          fill='#313E5E'
        />
      </g>
      <text
        x='64'
        y='50'
        textAnchor='middle'
        dominantBaseline='middle'
        fill={textColor}
        fontSize='26'
        fontFamily="'Suisse Intl', 'Inter', 'Segoe UI', sans-serif"
        fontWeight='700'
        letterSpacing='-0.26px'
      >
        {text}
      </text>
      <ellipse cx='64' cy='14' rx='28' ry='4' fill='black' fillOpacity='0.1' />
      <defs>
        <filter
          id='filter0_d_1_722'
          x='33'
          y='2'
          width='61.0001'
          height='79.0658'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1_722' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1_722' result='shape' />
        </filter>
      </defs>
    </svg>
  );
};

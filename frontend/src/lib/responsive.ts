/**
 * Responsive design utilities and hooks
 */

export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const screens = {
  mobile: 'max-w-sm',
  tablet: 'max-w-2xl',
  desktop: 'max-w-7xl',
} as const;

/**
 * Tailwind responsive prefixes for mobile-first design
 */
export const responsiveClass = {
  // Container width
  containerSm: 'w-full sm:w-96',
  containerMd: 'w-full md:w-2xl',
  containerLg: 'w-full lg:w-4xl',

  // Grid layouts
  gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  gridColsHalf: 'grid-cols-1 md:grid-cols-2',

  // Padding
  paddingResponsive: 'px-4 sm:px-6 md:px-8 lg:px-12',
  paddingResponsiveY: 'py-4 sm:py-6 md:py-8 lg:py-12',

  // Font sizes
  textResponsive: 'text-base sm:text-lg md:text-xl lg:text-2xl',

  // Display
  displayResponsive: 'flex flex-col sm:flex-row items-start sm:items-center',
};

/**
 * Hook to detect screen size
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < breakpoints.md) {
        setScreenSize('mobile');
      } else if (width < breakpoints.lg) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

import React from 'react';

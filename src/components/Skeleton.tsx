'use client';

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'card' | 'circular';
};

/**
 * Компонент для skeleton loading состояний.
 */
export function Skeleton({ width, height, className, variant = 'text' }: SkeletonProps) {
  const baseClassName = variant === 'text' ? 'skeleton skeleton-text' : 
                        variant === 'card' ? 'skeleton skeleton-card' : 
                        'skeleton';

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;
  if (variant === 'circular') {
    style.borderRadius = '50%';
  }

  return (
    <div
      className={`${baseClassName} ${className || ''}`}
      style={style}
    />
  );
}




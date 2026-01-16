import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'rose' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  const colorClasses = {
    rose: 'border-primary-200 border-t-primary-600',
    white: 'border-white/30 border-t-white',
    cream: 'border-cream-200 border-t-cream-600',
    warm: 'border-warm-200 border-t-warm-600',
    blue: 'border-blue-200 border-t-blue-600',
    gray: 'border-gray-200 border-t-gray-600',
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
    ></div>
  );
};

export default LoadingSpinner;

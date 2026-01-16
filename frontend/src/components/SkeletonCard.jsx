import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-soft overflow-hidden animate-pulse border border-cream-200">
      {/* Skeleton Image */}
      <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-cream-200 to-blush-100"></div>
      
      {/* Skeleton Content */}
      <div className="p-5 sm:p-6">
        {/* Title skeleton */}
        <div className="h-5 bg-cream-200 rounded-full mb-3 w-3/4"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-cream-100 rounded-full w-full"></div>
          <div className="h-3 bg-cream-100 rounded-full w-5/6"></div>
        </div>
        
        {/* Technologies skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-7 bg-primary-50 rounded-full w-16"></div>
          <div className="h-7 bg-blush-50 rounded-full w-20"></div>
          <div className="h-7 bg-cream-100 rounded-full w-14"></div>
        </div>
        
        {/* Links skeleton */}
        <div className="flex gap-3">
          <div className="h-10 bg-warm-200 rounded-xl flex-1"></div>
          <div className="h-10 bg-primary-200 rounded-xl flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;

import React from 'react';

const ConfirmationModal = ({ 
  isOpen, 
  title, 
  message, 
  description,
  confirmText = 'Confirm', 
  cancelText = 'Cancel', 
  onConfirm, 
  onCancel,
  type = 'danger' // 'danger' or 'info'
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch(type) {
      case 'danger':
        return {
          bgColor: '#FDE8E8',
          iconColor: '#C75C5C',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ),
          btnColor: '#C75C5C'
        };
      case 'info':
      default:
        return {
          bgColor: '#E8F4FD',
          iconColor: '#3B82F6',
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          btnColor: '#3B82F6'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div 
      className="fixed inset-0 bg-warm-900/50 backdrop-blur-sm flex items-start justify-center z-[100000] p-4 pt-20"
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-cream-200 animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-cream-200 bg-cream-50">
          <h2 className="font-heading text-lg font-bold text-warm-900">{title}</h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-full bg-white hover:bg-cream-100 flex items-center justify-center text-warm-500 hover:text-warm-700 transition-all shadow-soft"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: typeStyles.bgColor }}
          >
            <div style={{ color: typeStyles.iconColor }}>
              {typeStyles.icon}
            </div>
          </div>

          {/* Confirmation Text */}
          <div className="space-y-1">
            <p className="text-warm-900 font-semibold text-base">{message}</p>
            {description && (
              <p className="text-warm-600 text-sm">{description}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full pt-2">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-2 bg-white text-warm-700 rounded-lg font-semibold border-2 border-cream-200 hover:bg-cream-50 transition-all duration-200 text-sm"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 text-sm"
              style={{ backgroundColor: typeStyles.btnColor }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

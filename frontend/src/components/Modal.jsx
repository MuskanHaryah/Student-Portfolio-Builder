import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, title, children, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Render modal using Portal to ensure it's at the root level
  return ReactDOM.createPortal(
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        margin: 0,
        boxSizing: 'border-box'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '448px',
          maxHeight: '90vh',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          boxSizing: 'border-box'
        }}
      >
        {/* Header */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            borderBottom: '1px solid #e5e7eb',
            background: 'linear-gradient(to right, #f9fafb, #fce7f3)',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
          <h2 
            style={{
              fontWeight: 700,
              fontSize: '20px',
              color: '#111827',
              margin: 0,
              padding: 0,
              lineHeight: 1.2
            }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s',
              flexShrink: 0,
              padding: 0,
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#6b7280';
            }}
            aria-label="Close modal"
          >
            <svg 
              style={{ 
                width: '20px', 
                height: '20px',
                display: 'block'
              }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div 
          style={{ 
            padding: '24px',
            overflowY: 'auto',
            overflowX: 'hidden',
            flex: 1,
            boxSizing: 'border-box'
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
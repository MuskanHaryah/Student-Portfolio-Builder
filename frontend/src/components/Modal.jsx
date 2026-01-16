import React, { useEffect } from 'react';

const Modal = ({ isOpen, title, children, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          width: '100%',
          maxWidth: '28rem',
          maxHeight: 'calc(100vh - 2rem)',
          margin: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
            background: 'linear-gradient(to right, #f9fafb, #fce7f3)',
            borderTopLeftRadius: '1.5rem',
            borderTopRightRadius: '1.5rem',
            flexShrink: 0
          }}
        >
          <h2 
            style={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: '#111827',
              margin: 0
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '9999px',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={{ 
          padding: '1.5rem',
          overflowY: 'auto',
          flex: 1
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
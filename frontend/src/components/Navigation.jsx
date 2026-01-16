import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsDropdownOpen(false);
  };

  const confirmLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 border-b-2 border-primary-600' : 'text-warm-700 hover:text-primary-600';
  };

  return (
    <nav className="bg-cream-50/80 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 
              onClick={() => navigate('/')}
              className="text-xl sm:text-2xl font-heading font-bold cursor-pointer hover:scale-105 transition-transform flex items-center gap-2"
              style={{ color: '#C75C5C' }}
            >
              <span style={{ color: '#C75C5C' }}>✿</span>
              <span>Portfolio Builder</span>
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          {user && (
            <div className="hidden md:flex space-x-8 items-center">
              <button
                onClick={() => navigate('/')}
                className={`py-2 px-2 transition font-medium ${isActive('/')}`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className={`py-2 px-2 transition font-medium ${isActive('/dashboard')}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/portfolio')}
                className={`py-2 px-2 transition font-medium ${isActive('/portfolio')}`}
              >
                Portfolio
              </button>
            </div>
          )}

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full hover:bg-cream-100 transition-all shadow-soft border border-cream-200"
                >
                  <div className="w-8 h-8 text-white rounded-full flex items-center justify-center font-bold shadow-sm" style={{ backgroundColor: '#C75C5C' }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-warm-700">{user.name}</span>
                  <svg className="w-4 h-4 text-warm-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg py-2 z-10 border border-cream-200 animate-slide-down">
                    <div className="px-4 py-3 border-b border-cream-100 bg-cream-50">
                      <p className="text-xs text-warm-600 font-medium">Logged in as</p>
                      <p className="text-sm font-bold text-warm-900">@{user.username}</p>
                    </div>
                    <a
                      href="/portfolio"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-warm-700 hover:bg-cream-50 transition-colors font-medium"
                    >
                      View Portfolio
                    </a>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-2.5 text-sm text-primary-600 hover:bg-primary-50 transition-colors border-t border-cream-100 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2.5 text-primary-600 font-semibold rounded-full border-2 border-cream-300 hover:bg-cream-100 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn-rose"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-warm-700 hover:bg-cream-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cream-200 animate-slide-down">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 px-4 py-3 bg-cream-100 rounded-xl mb-3">
                  <div className="w-10 h-10 text-white rounded-full flex items-center justify-center font-semibold" style={{ backgroundColor: '#C75C5C' }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-warm-900">{user.name}</p>
                    <p className="text-xs text-warm-600">@{user.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </button>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-warm-700 hover:bg-cream-50 rounded-xl transition font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('/portfolio');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-warm-700 hover:bg-cream-50 rounded-xl transition font-medium"
                >
                  Portfolio
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-primary-600 hover:bg-cream-50 rounded-xl transition font-medium text-left border-2 border-cream-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition font-medium text-left"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-warm-900/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-20">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-cream-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-cream-200 bg-cream-50">
              <h2 className="font-heading text-lg font-bold text-warm-900">Confirm Logout</h2>
              <button
                onClick={cancelLogout}
                className="w-8 h-8 rounded-full bg-white hover:bg-cream-100 flex items-center justify-center text-warm-500 hover:text-warm-700 transition-all shadow-soft"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col items-center text-center space-y-4">
              {/* Logout Icon */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDE8E8' }}>
                <svg className="w-6 h-6" style={{ color: '#C75C5C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>

              {/* Confirmation Text */}
              <div className="space-y-1">
                <p className="text-warm-900 font-semibold text-base">Are you sure you want to logout?</p>
                <p className="text-warm-600 text-sm">You will need to login again to access your account.</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full pt-2">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-6 py-2 bg-white text-warm-700 rounded-lg font-semibold border-2 border-cream-200 hover:bg-cream-50 transition-all duration-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-6 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 text-sm"
                  style={{ backgroundColor: '#C75C5C' }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

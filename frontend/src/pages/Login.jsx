import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await authAPI.login(formData);
        const { user, token } = response.data;
        login(user, token);
        navigate('/dashboard');
      } catch (error) {
        // Handle different error types with user-friendly messages
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
          errorMessage = 'Cannot connect to the server. Please check if the server is running.';
        } else if (error.code === 'ECONNREFUSED') {
          errorMessage = 'Server is not responding. Please try again later.';
        } else if (error.message.includes('SSL') || error.message.includes('ssl')) {
          errorMessage = 'Connection error. Please check your server configuration.';
        } else if (error.response?.status === 401) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.response?.status === 404) {
          errorMessage = 'Account not found. Please check your email or sign up.';
        } else if (error.response?.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        
        setApiError(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-blush-50/30 to-primary-50/20 px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Decorative elements - Enhanced */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cream-200/60 to-blush-100/40 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary-100/40 to-cream-200/30 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-20 left-20 w-3 h-3 bg-primary-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-32 right-32 w-4 h-4 bg-cream-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-blush-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-cream-200/50 relative z-10 transform hover:scale-[1.01] transition-transform duration-300">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 p-2 hover:bg-cream-100 rounded-full transition-colors duration-200 group"
          aria-label="Go back to home"
        >
          <svg className="w-5 h-5 text-warm-600 group-hover:text-[#C75C5C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Decorative corner accent */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#C75C5C] to-primary-400 rounded-full opacity-20 blur-xl"></div>
        
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-[#C75C5C]/10 to-blush-100 rounded-2xl mb-4 shadow-soft transform hover:rotate-6 transition-transform duration-300">
            <svg className="w-12 h-12 text-[#C75C5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#C75C5C] mb-2">
            Welcome Back
          </h1>
          <p className="text-base text-warm-600">Login to your portfolio account</p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg animate-shake">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm font-medium">{apiError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="group">
            <label htmlFor="email" className="block text-sm font-semibold text-warm-700 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#C75C5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3.5 pl-11 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-cream-50/50 ${
                  errors.email
                    ? 'border-red-400 focus:ring-red-300 focus:border-red-500'
                    : 'border-cream-200 focus:ring-[#C75C5C]/30 focus:border-[#C75C5C] group-hover:border-cream-300'
                }`}
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1.5 flex items-center gap-1 animate-slide-down">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="group">
            <label htmlFor="password" className="block text-sm font-semibold text-warm-700 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#C75C5C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3.5 pl-11 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-cream-50/50 ${
                  errors.password
                    ? 'border-red-400 focus:ring-red-300 focus:border-red-500'
                    : 'border-cream-200 focus:ring-[#C75C5C]/30 focus:border-[#C75C5C] group-hover:border-cream-300'
                }`}
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1.5 flex items-center gap-1 animate-slide-down">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C75C5C] hover:bg-[#B54C4C] text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 mt-8 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            {loading ? (
              <>
                <LoadingSpinner size="sm" color="white" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-warm-600">
            Don't have an account?{' '}
            <a 
              href="/register" 
              className="text-[#C75C5C] hover:text-[#B54C4C] font-bold underline-offset-4 hover:underline transition-all duration-200"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Additional decorative element */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-warm-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Your data is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

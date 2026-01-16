import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
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
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await authAPI.register({
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });
        const { user, token } = response.data;
        login(user, token);
        navigate('/dashboard');
      } catch (error) {
        setApiError(error.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4 py-8 sm:py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blush-100/50 to-cream-200/40 rounded-full blur-3xl -translate-y-1/4 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-primary-100/40 to-cream-200/30 rounded-full blur-3xl translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-blush-400 rounded-full animate-bounce-slow"></div>
      <div className="absolute top-32 right-32 w-4 h-4 bg-primary-300 rounded-full animate-bounce-slow" style={{ animationDelay: '0.7s' }}></div>
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg p-8 sm:p-10 border border-cream-200 relative z-10">
        {/* Decorative flower */}
        <div className="absolute -top-6 -left-6 text-4xl transform -rotate-12"></div>
        
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-blush-100 to-primary-100 rounded-2xl mb-4 shadow-soft">
            <span className="text-4xl"></span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gradient-rose mb-2">Create Account</h1>
          <p className="text-sm sm:text-base text-warm-600">Join and showcase your amazing projects</p>
        </div>

        {apiError && (
          <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl">
            <p className="text-primary-700 text-sm">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-warm-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition bg-cream-50/50 ${
                errors.name
                  ? 'border-primary-400 focus:ring-primary-300'
                  : 'border-cream-200 focus:ring-primary-200 focus:border-primary-400'
              }`}
            />
            {errors.name && <p className="text-primary-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition bg-cream-50/50 ${
                errors.email
                  ? 'border-primary-400 focus:ring-primary-300'
                  : 'border-cream-200 focus:ring-primary-200 focus:border-primary-400'
              }`}
            />
            {errors.email && <p className="text-primary-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-warm-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="janedoe"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition bg-cream-50/50 ${
                errors.username
                  ? 'border-primary-400 focus:ring-primary-300'
                  : 'border-cream-200 focus:ring-primary-200 focus:border-primary-400'
              }`}
            />
            {errors.username && <p className="text-primary-600 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-warm-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition bg-cream-50/50 ${
                errors.password
                  ? 'border-primary-400 focus:ring-primary-300'
                  : 'border-cream-200 focus:ring-primary-200 focus:border-primary-400'
              }`}
            />
            {errors.password && <p className="text-primary-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-warm-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition bg-cream-50/50 ${
                errors.confirmPassword
                  ? 'border-primary-400 focus:ring-primary-300'
                  : 'border-cream-200 focus:ring-primary-200 focus:border-primary-400'
              }`}
            />
            {errors.confirmPassword && <p className="text-primary-600 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3.5 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2 shadow-rose hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {loading && <LoadingSpinner size="sm" color="white" />}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-warm-600 mt-8">
          Already have an account?{' '}
          <a href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

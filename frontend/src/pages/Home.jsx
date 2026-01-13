import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Showcase Your Skills<br />
            Build Your Future
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-slide-up">
            Create a professional portfolio, display your projects, and impress employers with your work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 inline-block"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 inline-block"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 inline-block"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-slide-up">
              <div className="text-4xl mb-4 animate-bounce-slow">📁</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Project Management</h3>
              <p className="text-gray-600">
                Add, organize, and showcase your projects with rich descriptions, technologies used, and live links.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl mb-4 animate-bounce-slow" style={{ animationDelay: '0.2s' }}>🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Design</h3>
              <p className="text-gray-600">
                Beautiful, modern portfolio templates that make your work stand out and impress employers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-4 animate-bounce-slow" style={{ animationDelay: '0.4s' }}>🔗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Shareable Links</h3>
              <p className="text-gray-600">
                Generate unique portfolio URLs to share with recruiters, peers, and on social media.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center animate-slide-up">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sign Up</h4>
              <p className="text-gray-600 text-sm">Create your free account in seconds</p>
            </div>

            {/* Step 2 */}
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Add Projects</h4>
              <p className="text-gray-600 text-sm">Upload your projects with descriptions and links</p>
            </div>

            {/* Step 3 */}
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Customize</h4>
              <p className="text-gray-600 text-sm">Add your skills, bio, and social links</p>
            </div>

            {/* Step 4 */}
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Share</h4>
              <p className="text-gray-600 text-sm">Share your portfolio and impress recruiters</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-lg text-blue-100 mb-8 animate-slide-up">
            Join students and developers who are showcasing their skills to the world.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 animate-scale-in"
            >
              Start Building Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

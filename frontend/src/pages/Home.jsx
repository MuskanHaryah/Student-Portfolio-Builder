import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cream-200/60 to-blush-100/40 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary-100/40 to-cream-200/30 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        <div className="absolute top-20 left-20 w-3 h-3 bg-primary-400 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-40 right-40 w-2 h-2 bg-blush-400 rounded-full animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-cream-400 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-warm-900 mb-6 leading-tight animate-fade-in">
                Your Skills are{' '}
                <span className="text-gradient-rose">What Make You</span>{' '}
                <span className="relative inline-block">
                  Unique
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8C50 2 150 2 198 8" stroke="#C75C5C" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-warm-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-slide-up">
                Create a stunning portfolio that showcases your skills and projects. Stand out from the crowd with a beautifully designed professional presence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {isAuthenticated ? (
                  <Link 
                    to="/dashboard" 
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    style={{ backgroundColor: '#C75C5C' }}
                  >
                    Go to Dashboard
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/register" 
                      className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      style={{ backgroundColor: '#C75C5C' }}
                    >
                      Get Started Free
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link 
                      to="/login" 
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-warm-900 font-semibold rounded-full border-2 border-cream-300 hover:border-[#C75C5C] hover:bg-cream-50 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Right decorative image placeholder */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Main decorative card */}
                <div className="bg-gradient-to-br from-blush-200 to-cream-200 rounded-[3rem] p-8 transform rotate-3 shadow-2xl">
                  <div className="bg-white rounded-[2rem] p-6 transform -rotate-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-xl"></div>
                      <div>
                        <div className="h-3 w-24 bg-warm-200 rounded-full"></div>
                        <div className="h-2 w-16 bg-warm-100 rounded-full mt-2"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-cream-100 rounded-full"></div>
                      <div className="h-2 w-4/5 bg-cream-100 rounded-full"></div>
                      <div className="h-2 w-3/5 bg-cream-100 rounded-full"></div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-medium">Design</span>
                      <span className="px-3 py-1 bg-cream-100 text-secondary-600 rounded-full text-xs font-medium">Creative</span>
                      <span className="px-3 py-1 bg-blush-100 text-blush-600 rounded-full text-xs font-medium">Pro</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cream-300/40 rounded-full blur-2xl"></div>
                
                {/* Small floating cards */}
                <div className="absolute -top-6 right-12 bg-white rounded-xl p-3 shadow-lg border border-cream-100 animate-bounce-slow">
                  <span className="text-2xl"></span>
                </div>
                <div className="absolute bottom-12 -left-6 bg-white rounded-xl p-3 shadow-lg border border-cream-100 animate-bounce-slow" style={{ animationDelay: '0.7s' }}>
                  <span className="text-2xl"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-white/50 backdrop-blur-sm py-16 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-warm-900 mb-4 animate-fade-in">
              Welcome to Portfolio Builder
            </h2>
            <p className="text-warm-600 max-w-2xl mx-auto">
              Join thousands of students and professionals who trust us to showcase their amazing work.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-slide-up">
              {[
                { number: '32+', label: 'Experience', sublabel: 'Projects Built' },
                { number: '82', label: 'Mentored', sublabel: 'Students' },
                { number: '28', label: 'Satisfaction', sublabel: 'Reviews' },
                { number: '100%', label: 'Free', sublabel: 'To Start' },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    index === 0 ? 'text-white shadow-lg' : 'bg-white border-2 border-cream-200 hover:border-[#C75C5C]/30'
                  }`}
                  style={index === 0 ? { backgroundColor: '#C75C5C' } : {}}
                >
                  <div className={`font-heading text-3xl sm:text-4xl font-bold mb-2 ${index === 0 ? 'text-white' : 'text-warm-900'}`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-semibold mb-1 ${index === 0 ? 'text-white' : 'text-warm-700'}`}>
                    {stat.label}
                  </div>
                  <div className={`text-xs ${index === 0 ? 'text-white/80' : 'text-warm-500'}`}>
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-20 bg-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block font-medium text-sm tracking-wider uppercase mb-3" style={{ color: '#C75C5C' }}>Features</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-warm-900 mb-4 animate-fade-in">
              We Can Help Transform You
            </h2>
            <p className="text-warm-600 max-w-2xl mx-auto">
              Everything you need to create a stunning portfolio and land your dream opportunity.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '💡',
                title: 'Problem Solving',
                description: 'Showcase your unique approach to solving complex challenges'
              },
              {
                icon: '❤️',
                title: 'Identifying Passion',
                description: 'Display projects that truly represent your interests'
              },
              {
                icon: '📈',
                title: 'Growth Career',
                description: 'Track your progress and build your professional brand'
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="relative p-6 sm:p-8 rounded-3xl text-center transition-all duration-500 hover:-translate-y-3 group animate-slide-up bg-white border-2 border-cream-200 hover:border-[#C75C5C]/40 shadow-soft hover:shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 bg-gradient-to-br from-cream-100 to-cream-50">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold mb-3 text-warm-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-warm-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block font-medium text-sm tracking-wider uppercase mb-3" style={{ color: '#C75C5C' }}>Our Expertise</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-warm-900 mb-6">
              Proving Our Expertise
            </h2>
            <p className="text-warm-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              We've helped hundreds of students and professionals create stunning portfolios that showcase their unique skills and land amazing opportunities.
            </p>
          </div>
          
          {/* Progress bars */}
          <div className="space-y-6 mb-10">
            {[
              { label: 'User Experience', percentage: 95 },
              { label: 'Communication', percentage: 88 },
              { label: 'Satisfaction', percentage: 92 },
            ].map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-warm-700 font-semibold">{skill.label}</span>
                  <span className="font-bold" style={{ color: '#C75C5C' }}>{skill.percentage}%</span>
                </div>
                <div className="h-3 bg-cream-200 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.percentage}%`, backgroundColor: '#C75C5C' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {!isAuthenticated && (
            <div className="text-center">
              <Link 
                to="/register" 
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: '#C75C5C' }}
              >
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white/50 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-20 border-y border-cream-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block font-medium text-sm tracking-wider uppercase mb-3" style={{ color: '#C75C5C' }}>Process</span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-warm-900 mb-4 animate-fade-in">
              How It Works
            </h2>
            <p className="text-warm-600 max-w-2xl mx-auto">
              Creating your professional portfolio is simple and takes just a few minutes.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { step: '1', title: 'Sign Up', description: 'Create your free account in seconds' },
                { step: '2', title: 'Add Projects', description: 'Upload your best work with details' },
                { step: '3', title: 'Customize', description: 'Add your bio, skills, and links' },
                { step: '4', title: 'Share', description: 'Get your unique portfolio URL' },
              ].map((item, index) => (
                <div key={index} className="text-center animate-slide-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div 
                    className="text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-5 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300"
                    style={{ backgroundColor: '#C75C5C' }}
                  >
                    {item.step}
                  </div>
                  <h4 className="font-heading font-bold text-warm-900 mb-2 text-base sm:text-lg">{item.title}</h4>
                  <p className="text-warm-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #C75C5C 0%, #A84848 100%)` }}></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
                Ready to Build Your Portfolio?
              </h2>
              <p className="text-lg sm:text-xl text-white/95 mb-10 max-w-2xl mx-auto animate-slide-up">
                Join thousands of students and developers who are showcasing their skills to the world. Start your journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white font-semibold rounded-full hover:bg-cream-50 hover:scale-105 transition-all duration-300 shadow-lg"
                  style={{ color: '#C75C5C' }}
                >
                  Start Building Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: '#2C1810' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                <span style={{ color: '#C75C5C' }}>✿</span> Portfolio Builder
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#E5D4C1' }}>
                Create stunning portfolios that showcase your unique skills and help you land your dream opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="transition-colors" style={{ color: '#E5D4C1', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = '#E5D4C1'}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="transition-colors" style={{ color: '#E5D4C1', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = '#E5D4C1'}>
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="transition-colors" style={{ color: '#E5D4C1', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = '#E5D4C1'}>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Features</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#E5D4C1' }}>
                <li>Project Showcase</li>
                <li>Custom Themes</li>
                <li>Shareable Links</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Connect</h4>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C75C5C'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                >
                  <span className="text-lg" style={{ color: '#FFFFFF' }}>𝕏</span>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C75C5C'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                >
                  <span className="text-lg" style={{ color: '#FFFFFF' }}>in</span>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C75C5C'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                >
                  <span className="text-lg" style={{ color: '#FFFFFF' }}>@</span>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 text-center text-sm" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p style={{ color: '#B8A89A' }}>© 2026 Portfolio Builder. Made with care for students everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

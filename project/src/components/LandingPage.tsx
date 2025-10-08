import React from 'react';
import { GraduationCap, Users, Building2, TrendingUp, Award, Globe, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <nav className="bg-white border-b-4 border-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl transform -rotate-6 border-3 border-gray-900">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900">Alumni Connect</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onLoginClick}
              className="px-6 py-2 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all font-bold border-3 border-gray-900"
            >
              Login
            </button>
            <button
              onClick={onSignupClick}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-bold border-3 border-gray-900 shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-200 px-4 py-2 rounded-full border-3 border-gray-900 mb-6 transform rotate-1">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <span className="font-black text-gray-900">Where Alumni & Students Unite</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Connect with Your
            <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mt-2">Alumni Network</span>
          </h1>
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
            Bridge the gap between current students and successful alumni. Track career paths,
            get mentorship, and stay connected with your college community.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onSignupClick}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all font-black text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-4 border-gray-900"
            >
              Get Started Free
            </button>
            <button
              onClick={onLoginClick}
              className="px-8 py-4 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition-all font-black text-lg shadow-lg border-4 border-gray-900"
            >
              Login
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-4 border-gray-900 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-3 border-gray-900 transform -rotate-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">For Students</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              Discover where your seniors are working, what roles they're in, and connect with
              them for career guidance and mentorship opportunities.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-4 border-gray-900 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-3 border-gray-900 transform rotate-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">For Alumni</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              Stay connected with your alma mater, network with fellow alumni, and give back by
              mentoring the next generation of students.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-4 border-gray-900 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-3 border-gray-900 transform -rotate-3">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">For Department</h3>
            <p className="text-gray-700 leading-relaxed font-medium">
              Manage student and alumni data, share important updates, organize events, and
              maintain strong connections across all departments.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 my-16 text-white border-4 border-gray-900 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Why Alumni Connect?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-white/20">
                <Award className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-black text-lg mb-2">Track Success</h4>
                <p className="text-gray-200 text-sm font-medium">
                  Monitor alumni career progression and achievements
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-white/20">
                <Globe className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-black text-lg mb-2">Global Network</h4>
                <p className="text-gray-200 text-sm font-medium">
                  Connect with alumni working worldwide
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border-2 border-white/20">
                <Users className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-black text-lg mb-2">Mentorship</h4>
                <p className="text-gray-200 text-sm font-medium">
                  Get guidance from experienced professionals
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Ready to Connect?</h2>
          <p className="text-gray-700 mb-8 font-medium text-lg">
            Join thousands of students and alumni already connected through our platform
          </p>
          <button
            onClick={onSignupClick}
            className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all font-black text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 border-4 border-gray-900"
          >
            Join Now
          </button>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-10 mt-20 border-t-4 border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-xl transform -rotate-6">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-xl">Alumni Connect</span>
          </div>
          <p className="text-gray-400 font-medium">
            Connecting students, alumni, and departments for a stronger future
          </p>
        </div>
      </footer>
    </div>
  );
};

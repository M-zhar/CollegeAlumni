import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, ArrowLeft, CircleUser as UserCircle } from 'lucide-react';

interface LoginProps {
  onBack?: () => void;
  onSignupClick?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onBack, onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'alumni' | 'department'>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, userType);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border-4 border-gray-900">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        )}

        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-2xl border-3 border-gray-900 transform rotate-3">
            <UserCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-center text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-8 font-medium">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              I am a
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`py-3 px-3 rounded-xl font-bold transition-all border-3 ${
                  userType === 'student'
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('alumni')}
                className={`py-3 px-3 rounded-xl font-bold transition-all border-3 ${
                  userType === 'alumni'
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                }`}
              >
                Alumni
              </button>
              <button
                type="button"
                onClick={() => setUserType('department')}
                className={`py-3 px-2 rounded-xl font-bold transition-all border-3 text-sm ${
                  userType === 'department'
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                }`}
              >
                Dept
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
              placeholder="you@college.edu"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border-3 border-red-500 text-red-700 px-4 py-3 rounded-xl font-bold">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-black hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border-3 border-gray-900"
          >
            <LogIn className="w-5 h-5" />
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {onSignupClick && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-medium">
              Don't have an account?{' '}
              <button
                onClick={onSignupClick}
                className="text-orange-600 font-bold hover:text-orange-700 underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

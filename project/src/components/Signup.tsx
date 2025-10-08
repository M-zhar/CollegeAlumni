import React, { useState } from 'react';
import { ArrowLeft, UserPlus, GraduationCap, Briefcase, Shield } from 'lucide-react';

interface SignupProps {
  onBack: () => void;
  onLoginClick: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onBack, onLoginClick }) => {
  const [userType, setUserType] = useState<'student' | 'alumni' | 'department'>('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    department: '',
    department_name: '',
    position: 'Administrator',
    enrollment_year: new Date().getFullYear(),
    current_year: 1,
    graduation_year: new Date().getFullYear(),
    current_company: '',
    current_position: '',
    location: '',
    linkedin_url: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      let endpoint = 'http://localhost:3001/api/auth/register/student';
      let payload: any = {};

      if (userType === 'student') {
        endpoint = 'http://localhost:3001/api/auth/register/student';
        payload = {
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          department: formData.department,
          enrollment_year: parseInt(formData.enrollment_year.toString()),
          current_year: parseInt(formData.current_year.toString()),
        };
      } else if (userType === 'alumni') {
        endpoint = 'http://localhost:3001/api/auth/register/alumni';
        payload = {
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          department: formData.department,
          graduation_year: parseInt(formData.graduation_year.toString()),
          current_company: formData.current_company,
          current_position: formData.current_position,
          location: formData.location,
          linkedin_url: formData.linkedin_url,
          phone: formData.phone,
        };
      } else if (userType === 'department') {
        endpoint = 'http://localhost:3001/api/auth/register/department';
        payload = {
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          department_name: formData.department_name,
          position: formData.position,
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          onLoginClick();
        }, 2000);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-gray-900">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-4 transform rotate-3">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Join Us!</h1>
            <p className="text-gray-600 font-medium">Create your account and connect</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`py-4 px-4 rounded-2xl font-bold transition-all border-3 ${
                userType === 'student'
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
              }`}
            >
              <GraduationCap className="w-6 h-6 mx-auto mb-2" />
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserType('alumni')}
              className={`py-4 px-4 rounded-2xl font-bold transition-all border-3 ${
                userType === 'alumni'
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
              }`}
            >
              <Briefcase className="w-6 h-6 mx-auto mb-2" />
              Alumni
            </button>
            <button
              type="button"
              onClick={() => setUserType('department')}
              className={`py-4 px-4 rounded-2xl font-bold transition-all border-3 ${
                userType === 'department'
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
              }`}
            >
              <Shield className="w-6 h-6 mx-auto mb-2" />
              Department
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                  required
                />
              </div>
            </div>

            {userType === 'department' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Department Name *
                  </label>
                  <input
                    type="text"
                    name="department_name"
                    value={formData.department_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                    placeholder="e.g., HOD, Administrator"
                  />
                </div>
              </div>
            ) : userType === 'student' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Enrollment Year *
                  </label>
                  <input
                    type="number"
                    name="enrollment_year"
                    value={formData.enrollment_year}
                    onChange={handleChange}
                    min="2000"
                    max="2100"
                    className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Current Year *
                  </label>
                  <select
                    name="current_year"
                    value={formData.current_year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                    required
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Graduation Year *
                    </label>
                    <input
                      type="number"
                      name="graduation_year"
                      value={formData.graduation_year}
                      onChange={handleChange}
                      min="1950"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Current Company
                    </label>
                    <input
                      type="text"
                      name="current_company"
                      value={formData.current_company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Current Position
                    </label>
                    <input
                      type="text"
                      name="current_position"
                      value={formData.current_position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-3 border-gray-900 rounded-xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 font-medium transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="bg-red-100 border-3 border-red-500 text-red-700 px-4 py-3 rounded-xl font-bold">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border-3 border-green-500 text-green-700 px-4 py-3 rounded-xl font-bold">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-black text-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed border-3 border-gray-900"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 font-medium">
              Already have an account?{' '}
              <button
                onClick={onLoginClick}
                className="text-orange-600 font-bold hover:text-orange-700 underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Alumni, DepartmentPost } from '../types';
import { LogOut, Users, MessageSquare, Calendar, Megaphone, Briefcase, MapPin, Linkedin, Phone, Mail } from 'lucide-react';
import { Avatar } from './Avatar';

export const AlumniDashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [posts, setPosts] = useState<DepartmentPost[]>([]);
  const [activeTab, setActiveTab] = useState<'alumni' | 'posts'>('alumni');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [alumniRes, postsRes] = await Promise.all([
        fetch('http://localhost:3001/api/alumni/list', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('http://localhost:3001/api/alumni/posts', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (alumniRes.ok) {
        const alumniData = await alumniRes.json();
        setAlumni(alumniData);
      }

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAlumni = alumni.filter((alum) =>
    alum.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.current_company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-5 h-5" />;
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      case 'announcement':
        return <Megaphone className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getPostColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-green-100 text-green-700';
      case 'message':
        return 'bg-blue-100 text-blue-700';
      case 'announcement':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Alumni Dashboard</h1>
              <p className="text-sm text-gray-600">{user?.full_name}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('alumni')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'alumni'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Alumni Network
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === 'posts'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Department Updates
          </button>
        </div>

        {activeTab === 'alumni' && (
          <>
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search by name, department, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlumni.map((alum) => (
                  <div key={alum.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar name={alum.full_name} size="lg" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{alum.full_name}</h3>
                        <p className="text-sm text-gray-600">{alum.department}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          Class of {alum.graduation_year}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {alum.current_company && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span>{alum.current_position} at {alum.current_company}</span>
                        </div>
                      )}
                      {alum.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{alum.location}</span>
                        </div>
                      )}
                      {alum.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{alum.email}</span>
                        </div>
                      )}
                      {alum.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{alum.phone}</span>
                        </div>
                      )}
                      {alum.linkedin_url && (
                        <a
                          href={alum.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn Profile</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No posts available yet.</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getPostColor(post.post_type)}`}>
                      {getPostIcon(post.post_type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Department: {post.department}</span>
                        <span>•</span>
                        <span>By: {post.created_by}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

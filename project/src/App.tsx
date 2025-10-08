import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { StudentDashboard } from './components/StudentDashboard';
import { AlumniDashboard } from './components/AlumniDashboard';
import { DepartmentDashboard } from './components/DepartmentDashboard';

type ViewState = 'landing' | 'login' | 'signup';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
      </div>
    );
  }

  if (!user) {
    if (currentView === 'landing') {
      return (
        <LandingPage
          onLoginClick={() => setCurrentView('login')}
          onSignupClick={() => setCurrentView('signup')}
        />
      );
    }

    if (currentView === 'signup') {
      return (
        <Signup
          onBack={() => setCurrentView('landing')}
          onLoginClick={() => setCurrentView('login')}
        />
      );
    }

    return (
      <Login
        onBack={() => setCurrentView('landing')}
        onSignupClick={() => setCurrentView('signup')}
      />
    );
  }

  if (user.role === 'student') {
    return <StudentDashboard />;
  }

  if (user.role === 'alumni') {
    return <AlumniDashboard />;
  }

  if (user.role === 'department') {
    return <DepartmentDashboard />;
  }

  return (
    <Login
      onBack={() => setCurrentView('landing')}
      onSignupClick={() => setCurrentView('signup')}
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

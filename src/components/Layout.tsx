import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import NotificationBell from './notifications/NotificationBell';

export default function Layout() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleStartCampaign = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    navigate('/campaigns/new');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="text-2xl font-bold text-indigo-600 hover:text-indigo-500"
              >
                Fervor
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleStartCampaign}
                className="inline-flex items-center px-4 py-2 border border-transparent 
                  text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 
                  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-indigo-500"
              >
                Start a Campaign
              </button>
              {user ? (
                <div className="flex items-center space-x-4">
                  <NotificationBell />
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-2 text-sm text-gray-700">{user.name}</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Fervor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
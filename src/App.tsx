import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CampaignDetailsPage from './pages/CampaignDetailsPage';
import CampaignCreatePage from './pages/CampaignCreatePage';
import RequireAuth from './components/auth/RequireAuth';
import { AuthProvider } from './context/AuthContext';
import { CampaignProvider } from './context/CampaignContext';
import { NotificationProvider } from './context/NotificationContext';

export default function App() {
  return (
    <AuthProvider>
      <CampaignProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/campaigns" replace />} />
                <Route path="/campaigns" element={<HomePage />} />
                <Route
                  path="/campaigns/new"
                  element={
                    <RequireAuth>
                      <CampaignCreatePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/campaign/:id"
                  element={
                    <RequireAuth>
                      <CampaignDetailsPage />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </NotificationProvider>
      </CampaignProvider>
    </AuthProvider>
  );
}
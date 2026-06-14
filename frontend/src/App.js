import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/authSlice';

// Pages
// HomePage removed — visitors are redirected straight to login
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RiskAssessmentPage from './pages/RiskAssessmentPage';
import DiseaseAlertsPage from './pages/DiseaseAlertsPage';
import ProfilePage from './pages/ProfilePage';
import CompliancePage from './pages/CompliancePage';
import ScannerPage from './pages/ScannerPage';

// Layout
import Layout from './components/Layout/Layout';

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        // Check if user is authenticated on app load
        dispatch(checkAuth());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Routes>
            {/* Root redirect — skip landing page, go straight to login or dashboard */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
            />
            <Route
                path="/register"
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />}
            />

            {/* Protected routes */}
            <Route
                path="/dashboard"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <DashboardPage />
                        </Layout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/risk-assessment"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <RiskAssessmentPage />
                        </Layout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/alerts"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <DiseaseAlertsPage />
                        </Layout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/profile"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <ProfilePage />
                        </Layout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/compliance"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <CompliancePage />
                        </Layout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/scanner"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <ScannerPage />
                        </Layout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;

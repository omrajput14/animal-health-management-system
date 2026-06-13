import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fetchFarms } from '../store/farmSlice';
import { fetchNearbyAlerts } from '../store/alertSlice';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, ShieldCheck, ActivitySquare, AlertTriangle, ScanLine, FileCheck, Stethoscope } from 'lucide-react';
import './DashboardPage.css';

function DashboardPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { currentFarm } = useSelector((state) => state.farm);
    const { nearbyAlerts } = useSelector((state) => state.alert);

    useEffect(() => {
        dispatch(fetchFarms());
    }, [dispatch]);

    useEffect(() => {
        if (currentFarm) {
            dispatch(fetchNearbyAlerts(currentFarm._id));
        }
    }, [currentFarm, dispatch]);

    // Mock Data for the Charts to show off Portfolio skills
    const scanHistoryData = [
        { date: 'Mon', scans: 12 },
        { date: 'Tue', scans: 19 },
        { date: 'Wed', scans: 15 },
        { date: 'Thu', scans: 25 },
        { date: 'Fri', scans: 22 },
        { date: 'Sat', scans: 30 },
        { date: 'Sun', scans: 28 },
    ];

    const healthDistributionData = [
        { name: 'Healthy', value: 85, color: '#10b981' },
        { name: 'LSD', value: 8, color: '#f59e0b' },
        { name: 'FMD', value: 4, color: '#ef4444' },
        { name: 'Other', value: 3, color: '#6366f1' },
    ];

    return (
        <div className="dashboard-page">
            <div className="welcome-section">
                <div className="welcome-text">
                    <h2>{t('dashboard.welcome')}, {user?.name}!</h2>
                    {currentFarm && <p className="farm-subtitle">{currentFarm.farmName}</p>}
                </div>
                <div className="date-badge">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {currentFarm ? (
                <>
                    {/* KPI Summary Row */}
                    <div className="kpi-grid">
                        <div className="kpi-card">
                            <div className="kpi-icon-wrapper primary">
                                <ScanLine size={24} />
                            </div>
                            <div className="kpi-content">
                                <span className="kpi-label">Total AI Scans</span>
                                <h3 className="kpi-value">131</h3>
                                <span className="kpi-trend positive">↑ 12% this week</span>
                            </div>
                        </div>

                        <div className="kpi-card">
                            <div className="kpi-icon-wrapper success">
                                <ShieldCheck size={24} />
                            </div>
                            <div className="kpi-content">
                                <span className="kpi-label">{t('dashboard.biosecurityScore')}</span>
                                <h3 className="kpi-value">{currentFarm.biosecurityScore || 85}<span className="kpi-unit">/100</span></h3>
                                <span className="kpi-trend positive">Good Standing</span>
                            </div>
                        </div>

                        <div className="kpi-card">
                            <div className="kpi-icon-wrapper warning">
                                <ActivitySquare size={24} />
                            </div>
                            <div className="kpi-content">
                                <span className="kpi-label">Herd Health</span>
                                <h3 className="kpi-value">85<span className="kpi-unit">%</span></h3>
                                <span className="kpi-trend negative">↓ 2% from last month</span>
                            </div>
                        </div>

                        <div className="kpi-card">
                            <div className="kpi-icon-wrapper danger">
                                <AlertTriangle size={24} />
                            </div>
                            <div className="kpi-content">
                                <span className="kpi-label">Active Alerts</span>
                                <h3 className="kpi-value">{nearbyAlerts?.length || 2}</h3>
                                <span className="kpi-trend neutral">In your region</span>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Row */}
                    <div className="analytics-row">
                        {/* Line Chart */}
                        <div className="chart-card">
                            <h3>Diagnostic Scan Volume (7 Days)</h3>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={scanHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Area type="monotone" dataKey="scans" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Pie Chart */}
                        <div className="chart-card">
                            <h3>Herd Health Distribution</h3>
                            <div className="chart-container pie-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={healthDistributionData}
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {healthDistributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="pie-legend">
                                    {healthDistributionData.map((entry, index) => (
                                        <div key={index} className="legend-item">
                                            <span className="legend-color" style={{ backgroundColor: entry.color }}></span>
                                            <span className="legend-label">{entry.name}</span>
                                            <span className="legend-value">{entry.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Restyled */}
                    <div className="quick-actions-section">
                        <h3>{t('dashboard.quickActions')}</h3>
                        <div className="action-grid">
                            <Link to="/scanner" className="action-card-modern primary">
                                <div className="action-icon"><Stethoscope size={28} /></div>
                                <div className="action-text">
                                    <h4>AI Disease Scanner</h4>
                                    <p>Scan a new animal with the AI model</p>
                                </div>
                            </Link>
                            <Link to="/risk-assessment" className="action-card-modern secondary">
                                <div className="action-icon"><Activity size={28} /></div>
                                <div className="action-text">
                                    <h4>{t('dashboard.takeAssessment')}</h4>
                                    <p>Evaluate your farm's risk factors</p>
                                </div>
                            </Link>
                            <Link to="/compliance" className="action-card-modern secondary">
                                <div className="action-icon"><FileCheck size={28} /></div>
                                <div className="action-text">
                                    <h4>Compliance Check</h4>
                                    <p>Review standard operating procedures</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className="empty-state card">
                    <div className="empty-icon">🏭</div>
                    <h3>No Farm Setup</h3>
                    <p>Please set up your farm to start using the portal</p>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;

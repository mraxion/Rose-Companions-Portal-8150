import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaChartBar, FaBell, FaCog } from 'react-icons/fa';
import './Admin.css';

const Dashboard = ({ users, stats }) => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = {
    users: {
      icon: <FaUsers />,
      title: 'Users',
      content: (
        <div className="users-list">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <img src={user.imageUrl || 'https://via.placeholder.com/40'} alt={user.name} className="user-avatar" />
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              <div className="user-status" data-status={user.status}>
                {user.status}
              </div>
            </div>
          ))}
        </div>
      )
    },
    analytics: {
      icon: <FaChartBar />,
      title: 'Analytics',
      content: (
        <div className="analytics-grid">
          {stats.map(stat => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
                <span className={`stat-trend ${stat.trend > 0 ? 'positive' : 'negative'}`}>
                  {stat.trend}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    notifications: {
      icon: <FaBell />,
      title: 'Notifications',
      content: (
        <div className="notifications-list">
          {/* Notifications content */}
        </div>
      )
    },
    settings: {
      icon: <FaCog />,
      title: 'Settings',
      content: (
        <div className="settings-panel">
          {/* Settings content */}
        </div>
      )
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-actions">
          <button className="action-btn">
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
        </div>
      </div>

      <div className="dashboard-nav">
        {Object.entries(tabs).map(([key, { icon, title }]) => (
          <motion.button
            key={key}
            className={`nav-item ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
            <span>{title}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {tabs[activeTab].content}
      </motion.div>
    </div>
  );
};

export default Dashboard;
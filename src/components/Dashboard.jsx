import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="welcome-section">
        <h2>Welcome, {user?.name}! 👋</h2>
        <p>You have successfully logged into your account.</p>
      </div>

      <div className="user-info-card">
        <h3>User Information</h3>
        <div className="user-details">
          <div className="detail-item">
            <span className="label">Name:</span>
            <span className="value">{user?.name}</span>
          </div>
          <div className="detail-item">
            <span className="label">Email:</span>
            <span className="value">{user?.email}</span>
          </div>
          <div className="detail-item">
            <span className="label">Role:</span>
            <span className="value role-badge">{user?.role}</span>
          </div>
          <div className="detail-item">
            <span className="label">User ID:</span>
            <span className="value">{user?.id}</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h3>Available Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>🛒 Product Catalog</h4>
            <p>Browse our extensive collection of products</p>
          </div>
          <div className="feature-card">
            <h4>📦 Order History</h4>
            <p>View your previous orders and track current ones</p>
          </div>
          <div className="feature-card">
            <h4>❤️ Wishlist</h4>
            <p>Save your favorite items for later</p>
          </div>
          <div className="feature-card">
            <h4>🔐 Account Settings</h4>
            <p>Manage your profile and preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
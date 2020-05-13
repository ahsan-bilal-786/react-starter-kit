import React from 'react';
import ErrorBoundary from 'components/ErrorBoundary';

const Dashboard = () => {
  return (
    <ErrorBoundary>
      <h2>Dashboard</h2>
    </ErrorBoundary>
  );
};

export default Dashboard;

import React from 'react';
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = (): JSX.Element => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

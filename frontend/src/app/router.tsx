import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { DashboardPage } from '../features/leads/pages/DashboardPage';
import { LeadsListPage } from '../features/leads/pages/LeadsListPage';
import { LeadFormPage } from '../features/leads/pages/LeadFormPage';
import { LeadDetailsPage } from '../features/leads/pages/LeadDetailsPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'leads',
        element: <LeadsListPage />,
      },
      {
        path: 'leads/new',
        element: <LeadFormPage />,
      },
      {
        path: 'leads/:id',
        element: <LeadDetailsPage />,
      },
      {
        path: 'leads/:id/edit',
        element: <LeadFormPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

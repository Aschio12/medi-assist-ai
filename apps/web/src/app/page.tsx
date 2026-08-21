import { DashboardLayout } from '@/components/layout/DashboardLayout';
// Re-export the dashboard here temporarily to bypass middleware blocks during local dev until Supabase is provisioned
import Dashboard from './(dashboard)/page';

export default function RootPage() {
  return <Dashboard />;
}

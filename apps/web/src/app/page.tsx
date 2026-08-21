import { redirect } from 'next/navigation';

export default function RootPage() {
  // Automatically redirect to the dashboard. Middleware will catch unauthenticated users and send them to /auth/login
  redirect('/dashboard');
}

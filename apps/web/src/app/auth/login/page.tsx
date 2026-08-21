import { LoginForm } from '@/components/auth/LoginForm';
import { RoleSelector } from '@/components/auth/RoleSelector';

export default function LoginPage() {
  return (
    <div className="glass-panel p-8 rounded-3xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white tracking-wide">Secure Clinical Login</h1>
        <p className="text-zinc-400 text-sm mt-2">Zero-Trust Authentication Gateway</p>
      </div>
      <RoleSelector />
      <LoginForm />
    </div>
  );
}

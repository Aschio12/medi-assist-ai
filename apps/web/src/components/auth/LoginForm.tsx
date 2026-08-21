'use client';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase login logic will go here
    window.location.href = '/';
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Hospital Email</label>
        <input 
          type="email" 
          required 
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-neon-500/50 transition-colors"
          placeholder="dr.smith@hospital.org"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
        <input 
          type="password" 
          required 
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-neon-500/50 transition-colors"
          placeholder="••••••••"
        />
      </div>
      <button type="submit" className="w-full bg-neon-500 hover:bg-neon-400 text-black font-semibold py-3.5 rounded-xl transition-all neon-glow mt-4">
        Authenticate
      </button>
      <div className="text-center mt-6">
        <a href="#" className="text-neon-400 text-sm hover:underline">Requires SSO or Smart Card?</a>
      </div>
    </form>
  );
}

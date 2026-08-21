export default function MFAPage() {
  return (
    <div className="glass-panel p-8 rounded-3xl text-center">
      <h2 className="text-xl font-bold text-white mb-4">Multi-Factor Authentication</h2>
      <p className="text-zinc-400 text-sm mb-6">Enter the 6-digit code from your authenticator app or insert your YubiKey.</p>
      <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-[0.5em] focus:border-neon-500/50 transition-colors mb-6" placeholder="000000" maxLength={6} />
      <button className="w-full bg-neon-500 text-black font-semibold py-3.5 rounded-xl transition-all neon-glow">Verify Identity</button>
    </div>
  );
}

export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white/10 
        backdrop-blur-2xl 
        border border-white/20 
        shadow-[0_8px_32px_rgba(31,38,135,0.15)]
        rounded-3xl p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}

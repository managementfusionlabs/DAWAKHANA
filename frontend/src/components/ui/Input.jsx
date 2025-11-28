export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`
        w-full p-3 rounded-xl
        bg-white/20 
        border border-white/30 
        placeholder-white/70
        text-neutral-600
        backdrop-blur-sm
        focus:ring-2 focus:ring-blue-300 
        outline-none transition
        ${className}
      `}
    />
  );
}

export default function Select({ children, className = "", ...props }) {
  return (
    <select
      {...props}
      className={`
        w-full p-3 rounded-xl
        bg-white/20 text-white
        border border-white/30
        backdrop-blur-sm
        focus:ring-2 focus:ring-blue-300
        outline-none transition
        ${className}
      `}
    >
      {children}
    </select>
  );
}

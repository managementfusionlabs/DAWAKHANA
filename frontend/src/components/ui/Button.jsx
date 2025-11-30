export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`
        w-full py-3 rounded-[50px] 
        bg-blue-500/80 
        hover:bg-blue-800
        text-white font-semibold
        shadow-lg transition
        backdrop-blur-xl
        active:scale-[0.98]
        ${className}
      `}
    >
      {children}
    </button>
  );
}

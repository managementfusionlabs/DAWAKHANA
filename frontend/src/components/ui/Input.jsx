export default function Input({ className = "", ...props }) {
  const hasValue = props.value != null && String(props.value).length > 0;

  return (
    <div className={`relative group ${props.disabled ? "opacity-60" : ""}`}>
      {/* gradient glow layer (appears on focus) */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-xl pointer-events-none
          bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500
          opacity-0 transform scale-95 transition-all duration-300
          group-focus-within:opacity-100 group-focus-within:scale-100 blur-lg"
      />

      <input
        {...props}
        className={`w-full p-3 rounded-xl
          bg-white/20 border border-white/30 placeholder-red-900
          text-black backdrop-blur-[90px]
          focus:ring-0 outline-none transition-all duration-300 transform-gpu
          focus:scale-[1.01] focus:shadow-lg focus:shadow-blue-300/30
          focus:border-transparent
          ${className}`}
      />

      {/* floating label (optional) */}
      <span
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/60 pointer-events-none transition-all duration-200
          ${hasValue ? "-translate-y-6 scale-90 text-white/80" : "group-focus-within:-translate-y-6 group-focus-within:scale-90 group-focus-within:text-white/80"}`}
      >
        {props.label ?? ""}
      </span>

      {/* animated underline accent */}
      <div className="absolute left-4 right-4 bottom-2 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500
        transform scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100" />
    </div>
  );
}

export default function Checkbox({ label, className = "", ...props }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer text-white/90">
      <input
        type="checkbox"
        className={`
          w-5 h-5 rounded-md
          bg-white/10 border border-white/40
          checked:bg-blue-500 checked:border-blue-400
          transition
          ${className}
        `}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}

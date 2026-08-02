import React from "react";

const Input = React.forwardRef(function Input({
  label,
  className,
  type = "text",
  placeholder,
  ref,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        ref={ref}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-gray-900
          outline-none
          transition-all
          duration-200
          placeholder:text-gray-400
          focus:border-green-600
          focus:ring-4
          focus:ring-green-100
        "
        {...props}
      />
    </div>
  );
});

export default Input;

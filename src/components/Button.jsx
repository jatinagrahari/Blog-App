import React from "react";

export default function Button({ children, className = "", type, ...props }) {
  const primary = `bg-green-600 text-white hover:bg-green-700 rounded-lg px-5 py-2 transition cursor-pointer ${className} `;
  const secondary = `bg-gray-200/80 text-black hover:bg-gray-400 rounded-lg px-5 py-2 transition cursor-pointer ${className}`;
  const otherBtn = `ml-2 font-semibold text-green-700 hover:underline cursor-pointer ${className}`;
  const fullwBtn = `w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 cursor-pointer ${className}`;

  let classname;
  if (type == "primary") classname = primary;
  else if (type == "secondary") classname = secondary;
  else if (type == "otherBtn") classname = otherBtn;
  else if (type == "fullwBtn") classname = fullwBtn;

  return (
    // <button className={type === "primary" ? primary : secondary}>
    <button className={classname} {...props}>
      {children}
    </button>
  );
}

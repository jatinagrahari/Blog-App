import React from "react";

export default function Button({
  children,
  className = "",
  btnType,
  ...props
}) {
  const primary = `rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 sm:px-5 sm:text-base cursor-pointer ${className}`;

  const secondary = `rounded-lg bg-gray-200/80 px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-400 sm:px-5 sm:text-base cursor-pointer ${className}`;

  const otherBtn = `ml-2 text-sm font-semibold text-green-700 transition hover:underline sm:text-base cursor-pointer ${className}`;

  const fullwBtn = `w-full rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 sm:py-3 sm:text-base cursor-pointer ${className}`;

  let classname;

  if (btnType === "primary") classname = primary;
  else if (btnType === "secondary") classname = secondary;
  else if (btnType === "otherBtn") classname = otherBtn;
  else if (btnType === "fullwBtn") classname = fullwBtn;

  return (
    <button className={classname} {...props}>
      {children}
    </button>
  );
}

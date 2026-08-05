import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-green-500/15" />

        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-100 bg-white shadow-lg">
          <span className="text-2xl font-bold">
            <span className="text-slate-900">B</span>
            <span className="text-green-600">A</span>
          </span>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold text-slate-900">
        Blog<span className="text-green-600">App</span>
      </h2>

      <p className="mt-2 text-sm text-slate-500">Preparing your workspace...</p>

      <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-green-600" />
      </div>
    </div>
  );
};

export default LoadingScreen;

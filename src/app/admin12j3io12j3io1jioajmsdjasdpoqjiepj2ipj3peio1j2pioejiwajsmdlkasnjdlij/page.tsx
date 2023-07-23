'use client';
import { useState } from 'react';

const Admin = () => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-8">
      <button
        className="rounded-lg bg-blue-500 px-8 py-4 text-4xl text-white hover:bg-blue-700 disabled:bg-gray-400"
        disabled={isRunning}
        onClick={() => setIsRunning(true)}
      >
        Start
      </button>
      <button
        className="rounded-lg bg-blue-500 px-8 py-4 text-4xl text-white hover:bg-blue-700 disabled:bg-gray-400"
        disabled={!isRunning}
        onClick={() => setIsRunning(false)}
      >
        Stop
      </button>
    </div>
  );
};

export default Admin;

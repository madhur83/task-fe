// components/LogoutButton.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
  
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

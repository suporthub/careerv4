import React, { useState, useEffect } from 'react';
import { Menu, LogOut, User as UserIcon } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { User } from '@supabase/supabase-js';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-slate-700 sticky top-0 z-30">
      <button onClick={onMenuClick} className="lg:hidden text-gray-400 hover:text-white">
        <Menu className="h-6 w-6" />
      </button>
      <div className="flex-1"></div> {/* Spacer */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <UserIcon className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-300 hidden md:block">{user?.email}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

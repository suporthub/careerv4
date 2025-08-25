import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Users, Settings, LogOut, X, GraduationCap, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useToast } from '../../hooks/useToast';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { addToast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    addToast('Logged out successfully.', 'info');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <BarChart className="h-5 w-5" /> },
    { name: 'Calendar', path: '/admin/calendar', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Applicants', path: '/admin/applicants', icon: <Users className="h-5 w-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`fixed lg:relative inset-y-0 left-0 bg-slate-800 w-64 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col border-r border-slate-700`}>
        <div className="flex items-center justify-between p-4 h-20 border-b border-slate-700">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Career Redefine</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${location.pathname.startsWith(item.path) ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-300 hover:bg-slate-700 hover:text-white'}`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-red-600/50 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

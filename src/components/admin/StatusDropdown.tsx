import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import { Registration } from '../../pages/AdminDashboard';

interface StatusDropdownProps {
  registration: Registration;
  onUpdateStatus: (id: string, status: Registration['status']) => void;
}

const statusOptions: Registration['status'][] = ['pending', 'approved', 'interviewed', 'rejected'];

const StatusDropdown: React.FC<StatusDropdownProps> = ({ registration, onUpdateStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusChange = (status: Registration['status']) => {
    onUpdateStatus(registration.id, status);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-white transition-colors"
        title="Change Status"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-700 border border-slate-600 rounded-md shadow-lg z-20">
          <div className="py-1">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                disabled={registration.status === status}
              >
                <span className={`h-2 w-2 mr-2 rounded-full bg-${
                  {pending: 'yellow', approved: 'green', interviewed: 'blue', rejected: 'red'}[status]
                }-400`}></span>
                Mark as {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;

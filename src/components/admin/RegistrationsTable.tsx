import React from 'react';
import { Registration } from '../../pages/AdminDashboard';
import { Eye, Calendar, Send, ExternalLink } from 'lucide-react';
import StatusDropdown from './StatusDropdown';

interface RegistrationsTableProps {
  registrations: Registration[];
  loading: boolean;
  onViewDetails: (registration: Registration) => void;
  onScheduleInterview: (registration: Registration) => void;
  onUpdateStatus: (id: string, status: Registration['status']) => void;
  onSendReminder: (registration: Registration) => void;
}

const StatusBadge: React.FC<{ status: Registration['status'] }> = ({ status }) => {
  const statusStyles = {
    pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    approved: 'bg-green-400/10 text-green-400 border-green-400/20',
    interviewed: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    rejected: 'bg-red-400/10 text-red-400 border-red-400/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
      <span className={`h-2 w-2 mr-1.5 rounded-full ${statusStyles[status].replace('/10', '/30').replace('text-', 'bg-')}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RegistrationsTable: React.FC<RegistrationsTableProps> = ({
  registrations,
  loading,
  onViewDetails,
  onScheduleInterview,
  onUpdateStatus,
  onSendReminder
}) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Education</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-700">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading registrations...</td></tr>
            ) : registrations.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No registrations found.</td></tr>
            ) : (
              registrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{registration.full_name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{registration.email}</div>
                    <div className="text-sm text-gray-400">{registration.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{registration.education}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={registration.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(registration.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button onClick={() => onViewDetails(registration)} className="text-gray-400 hover:text-blue-400 transition-colors" title="View Details"><Eye className="h-5 w-5" /></button>
                      
                      {registration.status === 'pending' && (
                        <button onClick={() => onScheduleInterview(registration)} className="text-gray-400 hover:text-green-400 transition-colors" title="Schedule Interview"><Calendar className="h-5 w-5" /></button>
                      )}

                      {(registration.status === 'approved' || registration.status === 'interviewed') && registration.interview_link && (
                        <>
                          <a href={registration.interview_link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors" title="Join Meeting"><ExternalLink className="h-5 w-5" /></a>
                          <button onClick={() => onSendReminder(registration)} className="text-gray-400 hover:text-purple-400 transition-colors" title="Send Reminder"><Send className="h-5 w-5" /></button>
                        </>
                      )}
                      <StatusDropdown registration={registration} onUpdateStatus={onUpdateStatus} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationsTable;

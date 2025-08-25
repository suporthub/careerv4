import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Download,
  RefreshCw,
  ClipboardList
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../hooks/useToast';

import StatCard from '../components/admin/StatCard';
import RegistrationsTable from '../components/admin/RegistrationsTable';
import RegistrationDetailModal from '../components/admin/RegistrationDetailModal';
import ScheduleInterviewModal from '../components/admin/ScheduleInterviewModal';

export type Registration = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  education: string;
  status: 'pending' | 'approved' | 'rejected' | 'interviewed';
  interview_link: string | null;
  interview_date: string | null;
  notes: string | null;
};

const AdminDashboard: React.FC = () => {
  const { addToast } = useToast();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching registrations:', error);
      addToast(`Failed to fetch registrations: ${error.message}`, 'error');
    } else {
      setRegistrations(data as Registration[]);
    }
    setLoading(false);
  }, [addToast]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const updateRegistrationStatus = async (id: string, status: Registration['status']) => {
    const { error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id);

    if (error) {
      addToast('Failed to update status.', 'error');
    } else {
      addToast('Status updated successfully.', 'success');
      fetchRegistrations();
      if (selectedRegistration?.id === id) {
        setSelectedRegistration(prev => prev ? { ...prev, status } : null);
      }
    }
  };

  const scheduleInterview = async (id: string, interview_link: string, interview_date: string) => {
    const { error } = await supabase
      .from('registrations')
      .update({ interview_link, interview_date, status: 'approved' })
      .eq('id', id);

    if (error) {
      addToast('Failed to schedule interview.', 'error');
    } else {
      addToast('Interview scheduled successfully!', 'success');
      
      const { data, error: funcError } = await supabase.functions.invoke('send-interview-email', { 
        body: { registrationId: id } 
      });

      if (funcError) {
        addToast(`Interview scheduled, but failed to send email: ${funcError.message}`, 'warning');
      } else if (data.simulated) {
        addToast(data.message, 'info');
      } else {
        addToast(data.message || 'Confirmation email sent.', 'success');
      }

      fetchRegistrations();
    }
    setIsScheduleModalOpen(false);
    setSelectedRegistration(null);
  };
  
  const sendReminderEmail = async (registration: Registration) => {
    addToast(`Sending reminder to ${registration.email}...`, 'info');
    const { data, error } = await supabase.functions.invoke('send-reminder', {
      body: { registrationId: registration.id },
    });
    if (error) {
      addToast(`Failed to send reminder: ${error.message}`, 'error');
    } else if (data.simulated) {
      addToast(data.message, 'info');
    } else {
      addToast(data.message || 'Reminder sent successfully!', 'success');
    }
  };

  const saveNotes = async (id: string, notes: string) => {
    const { error } = await supabase
      .from('registrations')
      .update({ notes })
      .eq('id', id);
    
    if (error) {
      addToast(`Failed to save notes: ${error.message}`, 'error');
    } else {
      addToast('Notes saved successfully.', 'success');
      fetchRegistrations(); // Refresh data
      if (selectedRegistration?.id === id) {
        setSelectedRegistration(prev => prev ? { ...prev, notes } : null);
      }
    }
  };

  const handleViewDetails = (reg: Registration) => {
    setSelectedRegistration(reg);
    setIsDetailModalOpen(true);
  };

  const handleScheduleInterview = (reg: Registration) => {
    setSelectedRegistration(reg);
    setIsScheduleModalOpen(true);
  };

  const filteredRegistrations = registrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = reg.full_name.toLowerCase().includes(searchLower) ||
                         reg.email.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'pending').length,
    approved: registrations.filter(r => r.status === 'approved').length,
    interviewed: registrations.filter(r => r.status === 'interviewed').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Applicants" value={stats.total} icon={<Users className="h-6 w-6" />} color="blue" />
        <StatCard title="Pending Review" value={stats.pending} icon={<Clock className="h-6 w-6" />} color="yellow" />
        <StatCard title="Approved" value={stats.approved} icon={<CheckCircle className="h-6 w-6" />} color="green" />
        <StatCard title="Interviewed" value={stats.interviewed} icon={<ClipboardList className="h-6 w-6" />} color="purple" />
        <StatCard title="Rejected" value={stats.rejected} icon={<XCircle className="h-6 w-6" />} color="red" />
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800 rounded-lg p-4 mb-8 border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="interviewed">Interviewed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => fetchRegistrations()} className="flex items-center space-x-2 bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50" disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <RegistrationsTable
        registrations={filteredRegistrations}
        loading={loading}
        onViewDetails={handleViewDetails}
        onScheduleInterview={handleScheduleInterview}
        onUpdateStatus={updateRegistrationStatus}
        onSendReminder={sendReminderEmail}
      />

      {/* Modals */}
      {selectedRegistration && (
        <>
          <RegistrationDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            registration={selectedRegistration}
            onSchedule={() => {
              setIsDetailModalOpen(false);
              handleScheduleInterview(selectedRegistration);
            }}
            onUpdateStatus={updateRegistrationStatus}
            onSaveNotes={saveNotes}
          />
          <ScheduleInterviewModal
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
            registration={selectedRegistration}
            onSchedule={scheduleInterview}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

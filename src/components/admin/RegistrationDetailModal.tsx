import React, { useState, useEffect } from 'react';
import { Registration } from '../../pages/AdminDashboard';
import { X, Mail, Phone, MapPin, Briefcase, GraduationCap, Clock, Info, Check, Calendar, Save } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  registration: Registration;
  onSchedule: () => void;
  onUpdateStatus: (id: string, status: Registration['status']) => void;
  onSaveNotes: (id: string, notes: string) => void;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string | React.ReactNode }> = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center text-sm font-medium text-gray-400">
      {icon}
      <span className="ml-2">{label}</span>
    </div>
    <p className="mt-1 text-base text-white">{value}</p>
  </div>
);

const RegistrationDetailModal: React.FC<Props> = ({ isOpen, onClose, registration, onSchedule, onUpdateStatus, onSaveNotes }) => {
  const [notes, setNotes] = useState(registration?.notes || '');

  useEffect(() => {
    setNotes(registration?.notes || '');
  }, [registration]);

  if (!isOpen) return null;

  const handleSaveNotes = () => {
    onSaveNotes(registration.id, notes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{registration.full_name}</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="h-6 w-6" /></button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-1 space-y-6">
              <DetailItem icon={<Mail className="h-4 w-4" />} label="Email" value={<a href={`mailto:${registration.email}`} className="text-purple-400 hover:underline">{registration.email}</a>} />
              <DetailItem icon={<Phone className="h-4 w-4" />} label="Phone" value={registration.phone} />
              <DetailItem icon={<GraduationCap className="h-4 w-4" />} label="Education" value={registration.education} />
            </div>

            {/* Right Column */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Admin Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  placeholder="Add private notes for this applicant..."
                />
                <button 
                  onClick={handleSaveNotes}
                  className="mt-2 flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Notes
                </button>
              </div>
            </div>
          </div>

          {registration.status === 'pending' && (
            <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button onClick={onSchedule} className="flex-1 flex items-center justify-center bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                <Check className="h-5 w-5 mr-2" />
                Schedule Interview
              </button>
              <button onClick={() => onUpdateStatus(registration.id, 'rejected')} className="flex-1 flex items-center justify-center bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                <X className="h-5 w-5 mr-2" />
                Reject Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetailModal;

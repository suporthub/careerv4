import React from 'react';
import { Registration } from '../../pages/AdminDashboard';
import { X, Calendar, Link as LinkIcon } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  registration: Registration;
  onSchedule: (id: string, link: string, date: string) => void;
}

const ScheduleInterviewModal: React.FC<Props> = ({ isOpen, onClose, registration, onSchedule }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const interviewLink = formData.get('interviewLink') as string;
    const interviewDate = formData.get('interviewDate') as string;
    onSchedule(registration.id, interviewLink, interviewDate);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg max-w-md w-full border border-slate-700 shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Schedule Interview</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="h-6 w-6" /></button>
          </div>
          <p className="text-gray-400 mb-6">For: <span className="font-semibold text-white">{registration.full_name}</span></p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interview Date & Time</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input name="interviewDate" type="datetime-local" required className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Link (Google Meet, Zoom, etc.)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input name="interviewLink" type="url" placeholder="https://meet.google.com/..." required className="w-full pl-10 pr-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-8 flex space-x-3">
              <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 font-semibold transition-colors">Schedule & Approve</button>
              <button type="button" onClick={onClose} className="flex-1 bg-slate-600 text-white py-2.5 px-4 rounded-lg hover:bg-slate-500 font-semibold transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;

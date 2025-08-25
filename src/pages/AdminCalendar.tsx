import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../hooks/useToast';
import { Registration } from './AdminDashboard';
import RegistrationDetailModal from '../components/admin/RegistrationDetailModal';
import ScheduleInterviewModal from '../components/admin/ScheduleInterviewModal';

const AdminCalendar: React.FC = () => {
  const { addToast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [isCalendarLoading, setIsCalendarLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const fetchRegistrations = useCallback(async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .not('interview_date', 'is', null);

    if (error) {
      addToast(`Failed to fetch interviews: ${error.message}`, 'error');
    } else {
      const formattedEvents = (data as Registration[]).map(reg => ({
        id: reg.id,
        title: reg.full_name,
        start: reg.interview_date,
        extendedProps: { registration: reg },
        backgroundColor: '#8B5CF6', // purple-500
        borderColor: '#7C3AED', // purple-600
      }));
      setEvents(formattedEvents);
    }
  }, [addToast]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);
  
  const handleEventClick = (clickInfo: any) => {
    setSelectedRegistration(clickInfo.event.extendedProps.registration);
    setIsDetailModalOpen(true);
  };

  // Re-implementing functions needed for modals
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
      fetchRegistrations();
    }
    setIsScheduleModalOpen(false);
    setSelectedRegistration(null);
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
      fetchRegistrations();
      if (selectedRegistration?.id === id) {
        setSelectedRegistration(prev => prev ? { ...prev, notes } : null);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Interview Calendar</h1>
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 calendar-container relative">
        {isCalendarLoading && (
          <div className="absolute inset-0 bg-slate-800/70 flex items-center justify-center z-10 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          </div>
        )}
        <style>
          {`
            .fc { --fc-border-color: #334155; --fc-today-bg-color: rgba(168, 85, 247, 0.1); }
            .fc .fc-toolbar-title { color: #fff; }
            .fc .fc-button { background-color: #4f46e5; border-color: #4f46e5; }
            .fc .fc-button:hover { background-color: #4338ca; }
            .fc .fc-daygrid-day-number, .fc .fc-col-header-cell-cushion { color: #9ca3af; }
            .fc-event { cursor: pointer; }
          `}
        </style>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          eventClick={handleEventClick}
          height="auto"
          loading={(isLoading) => setIsCalendarLoading(isLoading)}
        />
      </div>

      {selectedRegistration && (
        <>
          <RegistrationDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            registration={selectedRegistration}
            onSchedule={() => {
              setIsDetailModalOpen(false);
              setSelectedRegistration(selectedRegistration);
              setIsScheduleModalOpen(true);
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

export default AdminCalendar;

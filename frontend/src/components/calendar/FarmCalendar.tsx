import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { enUS, fr, arSA } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';

const locales = {
  'en': enUS,
  'fr': fr,
  'ar': arSA,
};

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'watering' | 'fertilizing' | 'harvesting';
}

interface FarmCalendarProps {
  events: CalendarEvent[];
  onEventSelect: (event: CalendarEvent) => void;
}

export function FarmCalendar({ events, onEventSelect }: FarmCalendarProps) {
  const { i18n } = useTranslation();
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture={i18n.language}
        onSelectEvent={onEventSelect}
        className="bg-white p-4 rounded-lg shadow-sm"
      />
    </div>
  );
}
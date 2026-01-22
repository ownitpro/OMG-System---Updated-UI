'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function DateTimePicker({
  value,
  onChange,
  disabled = false,
  placeholder = 'Select date and time',
}: DateTimePickerProps) {
  const { isDarkMode } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const [time, setTime] = useState(value ? new Date(value).toTimeString().slice(0, 5) : '12:00');
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const [hours, minutes] = time.split(':').map(Number);
    newDate.setHours(hours || 0, minutes || 0);

    setSelectedDate(newDate);
    const isoString = newDate.toISOString().slice(0, 16);
    onChange(isoString);
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);

    if (selectedDate) {
      const [hours, minutes] = newTime.split(':').map(Number);
      const newDate = new Date(selectedDate);
      newDate.setHours(hours || 0, minutes || 0);

      const isoString = newDate.toISOString().slice(0, 16);
      onChange(isoString);
    }
  };

  const handleApply = () => {
    setShowPicker(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    setTime('12:00');
    onChange('');
    setShowPicker(false);
  };

  const previousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setViewDate(today);
  };

  const formatDisplayValue = () => {
    if (!selectedDate) return '';
    return selectedDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(viewDate);
    const firstDay = firstDayOfMonth(viewDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Previous month days (faded)
    const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <div
          key={`prev-${day}`}
          className={`p-1.5 text-center text-sm ${
            isDarkMode ? 'text-slate-600' : 'text-gray-300'
          }`}
        >
          {day}
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      date.setHours(0, 0, 0, 0);

      const isSelected = selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      const isToday = date.getTime() === today.getTime();
      const isPast = date < today;

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          disabled={isPast}
          className={`
            relative p-1.5 text-sm font-medium rounded-full w-9 h-9
            flex items-center justify-center
            transition-all duration-200
            ${isSelected
              ? 'bg-gradient-to-br from-teal-400 to-cyan-500 text-white shadow-lg shadow-teal-500/30 scale-110 z-10'
              : isToday
              ? isDarkMode
                ? 'bg-teal-500/20 text-teal-300 ring-2 ring-teal-500/40'
                : 'bg-teal-50 text-teal-600 ring-2 ring-teal-200'
              : isPast
              ? isDarkMode
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-gray-300 cursor-not-allowed'
              : isDarkMode
              ? 'text-slate-200 hover:bg-slate-700 hover:text-white'
              : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
            }
          `}
        >
          {day}
        </button>
      );
    }

    // Next month days (faded)
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className={`p-1.5 text-center text-sm ${
            isDarkMode ? 'text-slate-600' : 'text-gray-300'
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="relative" ref={pickerRef}>
      {/* Input Field */}
      <div
        onClick={() => !disabled && setShowPicker(!showPicker)}
        className={`
          group flex items-center gap-3 px-4 py-3
          border rounded-xl cursor-pointer
          transition-all duration-300
          ${showPicker
            ? 'border-white/60 bg-white/60 shadow-lg shadow-teal-500/10'
            : 'border-white/40 bg-white/50 hover:border-white/60 hover:bg-white/60'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <div className="p-1.5 rounded-lg transition-colors bg-teal-500/20 text-teal-600">
          <Calendar className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={formatDisplayValue()}
          placeholder={placeholder}
          readOnly
          className="flex-1 outline-none cursor-pointer text-sm font-medium bg-transparent text-navy placeholder:text-slate-400"
        />
        {selectedDate && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="p-1 rounded-full transition-colors text-slate-400 hover:text-navy hover:bg-white/50"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Calendar */}
      {showPicker && (
        <div
          className={`
            absolute z-50 mt-2 rounded-2xl p-4 w-[340px]
            transition-all duration-300 animate-in fade-in slide-in-from-top-2
            ${isDarkMode
              ? 'bg-slate-900 border border-slate-700 shadow-2xl shadow-black/50'
              : 'bg-white border border-gray-100 shadow-2xl shadow-gray-200/50'
            }
          `}
          style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={previousMonth}
              className={`
                p-2 rounded-xl transition-all duration-200
                ${isDarkMode
                  ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {monthNames[viewDate.getMonth()]}
              </span>
              <span className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                {viewDate.getFullYear()}
              </span>
            </div>

            <button
              type="button"
              onClick={nextMonth}
              className={`
                p-2 rounded-xl transition-all duration-200
                ${isDarkMode
                  ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={goToToday}
              className={`
                px-3 py-1.5 text-xs font-medium rounded-lg transition-all
                ${isDarkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }
              `}
            >
              Today
            </button>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div
                key={day}
                className={`
                  text-center text-xs font-semibold py-2
                  ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}
                `}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {renderCalendar()}
          </div>

          {/* Divider */}
          <div className={`h-px my-4 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`} />

          {/* Time Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`
                p-2 rounded-lg
                ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-500'}
              `}>
                <Clock className="w-4 h-4" />
              </div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Time
              </span>
            </div>
            <input
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(e.target.value)}
              className={`
                px-4 py-2 border-2 rounded-xl text-sm font-medium
                focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500
                transition-all duration-200 outline-none
                ${isDarkMode
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-gray-900'
                }
              `}
              style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={handleClear}
              className={`
                flex-1 px-4 py-2.5 text-sm font-medium rounded-xl
                transition-all duration-200
                ${isDarkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }
              `}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="
                flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl
                bg-gradient-to-r from-teal-500 to-cyan-500 text-white
                hover:from-teal-600 hover:to-cyan-600
                shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40
                transition-all duration-200
              "
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

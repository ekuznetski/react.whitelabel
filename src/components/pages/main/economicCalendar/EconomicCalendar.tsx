import React from 'react';
import { EconomicCalendarTopSection, EconomicCalendarWidget } from './components';

export function EconomicCalendar() {
  return (
    <div className="economic-calendar-wrapper">
      <EconomicCalendarTopSection />
      <EconomicCalendarWidget />
    </div>
  );
}

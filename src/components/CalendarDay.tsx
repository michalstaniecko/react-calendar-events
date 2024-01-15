import { ReactNode } from 'react';
import './CalendarDay.css';
import CalendarDayEvents from './CalendarDayEvents.tsx';

export type Event = {
  category: string
}

type CalendarDay = {
  children?: ReactNode,
  events?:   Event[]
}

function CalendarDay( { events, children }: CalendarDay ) {
  return (
    <div className={'calendar-day'}>
      <div className={'calendar-day-day'}>
        {children}
      </div>
      { events && <CalendarDayEvents />}
    </div>
  )
  ;
}

export default CalendarDay;

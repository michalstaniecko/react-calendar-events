import { lastDayOfMonth, getDay, getYear, getMonth } from 'date-fns';
import './Calendar.css';
import { useEffect, useState } from 'react';
import CalendarDay from './CalendarDay.tsx';

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Calendar = {
  year?:  number,
  month?: Month
}

const WEEKDAYS = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

const events = [
  { category: 'video' },
  { category: 'photo' },
];

function Calendar( {
  year = 2024,
  month = 1,
}: Calendar ) {
  const currentYear = getYear( new Date() );
  const currentMonth = getMonth( new Date() );
  const [ selectedYear, setSelectedYear ] = useState( currentYear );
  const [ selectedMonth, setSelectedMonth ] = useState( currentMonth );
  const lastDay = lastDayOfMonth( new Date( selectedYear, selectedMonth ) );
  const firstDay = getDay( new Date( selectedYear, selectedMonth, 1 ) );
  const monthDays = new Array( lastDay.getDate() ).fill( 0 ).map( ( _, index ) => ( {
    day: index + 1,
    id:  `${selectedYear}${selectedMonth}${index}`,
  } ) );
  const previousMonthDays = new Array( firstDay - 1 ).fill( '' ).map( ( _, index ) => ( {
    day: '',
    id:  `empty-${selectedYear}${selectedMonth}${index}`,
  } ) );
  const calendarMonthDays = [ ...previousMonthDays, ...monthDays ];

  useEffect( () => {
    setSelectedYear( year );
    setSelectedMonth( month - 1 );
  }, [ year, month ] );

  return (
    <div>
      <div className={'calendar-days calendar-header'}>
        {WEEKDAYS.map( day => ( <CalendarDay key={day}>{day}</CalendarDay> ) )}
      </div>
      <div className={'calendar-days calendar-body'}>
        {calendarMonthDays.map( ( { day, id } ) => <CalendarDay events={events} key={id}>{day}</CalendarDay> )}
      </div>
    </div>
  );
}

export default Calendar;

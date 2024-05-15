// Pseudo Code: Calendar component to display the calendar view of the application
"use client";
import React from "react";
//All of the dependencies that are required to use the Fullcalendar component
import Fullcalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./calendar.module.css";

const eventsPlaceholder = [
  { title: 'Event 1', date: '2024-05-14' },
  { title: 'Event 2', date: '2024-05-15' },
  { title: 'Event 3', date: '2024-05-16' },
  { title: 'Event 4', date: '2024-05-16' },
  { title: 'Event 5', date: '2024-05-19' },
  { title: 'Event 6', date: '2024-05-20' },
  { title: 'Event 7', date: '2024-05-23' }
];


//Calendar component that will display the calendar view of the application
function Calendar() {
  return (
    //Fullcalendar component that will display the calendar
    //Plugins that are required to display the calendar (day, time and interaction)
    //Initial view of the calendar will be dayGridMonth
    //Header toolbar that will display the title, today and previous and next buttons
    //Height of the calendar is set to 90vh (potentially change this through CSS modules)
    <div className={styles.calendar}>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        intialView={"dayGridMonth"}
        headerToolbar={{
          start: "title",
          center: "",
          end: "today prev,next",
        }}
        aspectRatio={1.5}
        events={eventsPlaceholder}
      />
    </div>
  );
}

export default Calendar;

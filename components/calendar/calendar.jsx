"use client";

// Import React from the 'react' package.
import React from "react";
import { useState, useEffect } from "react";

// Import FullCalendar from '@fullcalendar/react', which is the React wrapper for FullCalendar.
import FullCalendar from "@fullcalendar/react";

// Import necessary plugins (`dayGridPlugin`, `timeGridPlugin`, `interactionPlugin`, `bootstrap5Plugin`) from their respective packages.
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// Import Bootstrap CSS and Bootstrap Icons CSS for styling.
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import a CSS module (`styles`) for custom styling of the calendar component.
import styles from "./calendar.module.css";
// import GetEvents from "../../backend/getCalendar.jsx";
// import supabase
import { supabase } from "../../utils/supabase";

// A placeholder array of events to be displayed on the calendar.
// const eventsPlaceholder = <GetEvents />;

// [
//   { title: "Event 1", date: "2024-05-14"},
//   { title: "Event 2", date: "2024-05-15"},
//   { title: "Event 3", date: "2024-05-16"},
//   { title: "Event 4", date: "2024-05-16"},
//   { title: "Event 5", date: "2024-05-19"},
//   { title: "Event 6", date: "2024-05-20"},
//   { title: "Event 7", date: "2024-05-23"},
// ];

// Define a functional component named `CalendarComponent`.
function CalendarComponent() {
  // Return a JSX structure that represents the calendar UI.
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const { data: games } = await supabase.from("games").select("*");
      const eventData = games.map((game) => ({
        title: game.event_type,
        date: game.date,
      }));

      setEvents(eventData);
    };
    getGames();
  }, []);

  return (
    <div className={styles.calendar}>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrap5Plugin,
        ]}
        initialView="dayGridMonth"
        themeSystem="bootstrap5"
        headerToolbar={{ left: "title", center: "", right: "today,prev,next" }}
        aspectRatio={1.5}
        events={events} // Use the state variable here
      />
    </div>
  );
}

// Export the `Calendar` component as the default export of the module.
export default CalendarComponent;

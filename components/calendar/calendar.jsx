"use client";

// Import React from the 'react' package.
import React from "react";

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

// Define a functional component named `Calendar`.
function CalendarComponent() {
  // Return a JSX structure that represents the calendar UI.
  return (
    <div className={styles.calendar}>
      {/* Render the FullCalendar component with specific configurations and plugins */}
      <FullCalendar
        // Plugins to enable specific functionalities
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrap5Plugin,
        ]}
        // Specifies the initial view of the calendar
        initialView="dayGridMonth"
        // Indicates the theme system to use
        themeSystem="bootstrap5"
        // Configures the toolbar at the top of the calendar
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        // Sets the aspect ratio of the calendar
        aspectRatio={1.5}
      />
    </div>
  );
}

// Export the `Calendar` component as the default export of the module.
export default CalendarComponent;

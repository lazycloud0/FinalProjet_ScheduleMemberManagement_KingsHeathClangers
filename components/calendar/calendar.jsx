"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { supabase } from "../../src/utils/supabase/superbase.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./module.scss";
import styles from "./calendar.module.css";

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const getGames = async () => {
      const { data: games } = await supabase.from("games").select("*");
      const eventData = games.map((game) => ({
        id: game.id, // Include id in the event data
        title: game.event_type,
        date: game.date,
      }));
      setEvents(eventData);
    };
    getGames();
  }, []);

  const handleEventClick = ({ event }) => {
    // Navigate to /booking with event.id as a query parameter
    router.push(`/booking?eventUUID=${event.id}`);
  };

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
        headerToolbar={{
          left: "title",
          center: "",
          right: "today,prev,next",
        }}
        aspectRatio={1.5}
        events={events}
        eventClick={handleEventClick} // Add eventClick handler
      />
    </div>
  );
}

export default CalendarComponent;

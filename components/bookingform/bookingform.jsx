"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import useRouter from next/navigation
import { supabase } from "../../utils/supabase"; // Adjust this import according to your setup
import styles from "./bookingform.module.css";

function Booking() {
  const searchParams = useSearchParams(); // Initialize useSearchParams
  const router = useRouter(); // Initialize useRouter
  const [eventUUID, setEventUUID] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const uuid = searchParams.get("eventUUID");
    if (uuid) {
      setEventUUID(uuid);
    }
  }, [searchParams]);

  useEffect(() => {
    if (eventUUID) {
      const getGame = async () => {
        const { data: game, error } = await supabase
          .from("games")
          .select("*")
          .eq("id", eventUUID) // Use the eventUUID variable here
          .single(); // Use the single method to get a single record

        if (error) {
          console.error("Error fetching game: ", error);
        } else if (game) {
          setEvent({
            id: game.id,
            title: game.event_type,
            date: new Date(game.date).toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "2-digit",
            }),
            time: new Date(`1970-01-01T${game.time}Z`).toLocaleTimeString(
              "en-GB",
              { hour: "2-digit", minute: "2-digit" },
            ),
            team: game.team,
            location: game.location,
            spots_available: game.spots_available, // Include spots_available here
          });
        }
      };
      getGame();
    }
  }, [eventUUID]);

  const handleBookIn = () => {
    // Handle book in action here
  };

  const handleEditDelete = () => {
    router.push(`/edit?eventUUID=${eventUUID}`);
  };

  return (
    <div className={styles.container}>
      {eventUUID ? (
        event ? (
          <div className={styles.formSection}>
            <h1 className={styles.subtitle}>Event</h1>
            <p>Title: {event.title}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <p>Team: {event.team}</p>
            <p>Total spaces for the event: {event.spots_available}</p>{" "}
            {/* Display spots_available */}
            <button className={styles.requestButton} onClick={handleBookIn}>
              BOOK IN
            </button>
            <button className={styles.requestButton} onClick={handleEditDelete}>
              EDIT / DELETE
            </button>
          </div>
        ) : (
          <p className={styles.placeholder}>Loading event details...</p>
        )
      ) : (
        <p className={styles.placeholder}>Loading...</p>
      )}
    </div>
  );
}

export default Booking;

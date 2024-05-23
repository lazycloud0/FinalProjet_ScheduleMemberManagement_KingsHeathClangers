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
  const [errorMessage, setErrorMessage] = useState("");

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

            spots_available: game.spots_available,
            attendees: game.attendees,
          });
        }
      };
      getGame();
    }
  }, [eventUUID]);

  const handleBookIn = () => {
    const remainingPlaces =
      event.spots_available - (event.attendees?.length || 0);
    if (remainingPlaces <= 0) {
      setErrorMessage("No available spaces for this event");
    } else {
      // Handle book in action here
      setErrorMessage("");
      // Perform the booking operation
    }
  };

  const handleEditDelete = () => {
    router.push(`/edit?eventUUID=${eventUUID}`);
  };

  const remainingPlaces = event
    ? event.spots_available - (event.attendees?.length || 0)
    : 0;

  return (
    <div className={styles.container}>
      {eventUUID ? (
        event ? (
          <div className={styles.formSection}>
            <h1 className={styles.subtitle}>Event</h1>
            <p className={styles.list}>
              <b>Title:</b>
              <br></br> {event.title}
            </p>
            <p className={styles.list}>
              <b>Date:</b>
              <br></br> {event.date}
            </p>
            <p className={styles.list}>
              <b>Time:</b>
              <br></br> {event.time}
            </p>
            <p className={styles.list}>
              <b>Location:</b>
              <br></br> {event.location}
            </p>
            <p className={styles.list}>
              <b>Team:</b>
              <br></br> {event.team}
            </p>

            <p className={styles.list}>
              <b>Remaining Spaces:</b>
              <br></br> {remainingPlaces} / {event.spots_available}
            </p>

            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}

            <button className={styles.requestButton} onClick={handleBookIn}>
              BOOK IN
            </button>
            <button className={styles.requestButton} onClick={handleEditDelete}>
              AMEND EVENT
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

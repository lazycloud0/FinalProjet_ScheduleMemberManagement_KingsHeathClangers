"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../utils/supabase";
import styles from "./bookingform.module.css";

function Booking() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [eventUUID, setEventUUID] = useState(null);
  const [event, setEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");

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
          .eq("id", eventUUID)
          .single();

        if (error) {
          console.error("Error fetching game: ", "Unable to fetch game data");
        } else if (game) {
          const event = {
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
          };
          setEvent(event);
          if (event.spots_available - (event.attendees?.length || 0) <= 0) {
            setErrorMessage("No available spaces for this event");
          }
        }
      };
      getGame();
    }
  }, [eventUUID]);

  const handleBookIn = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setFullNameError("Full Name is required");
      return;
    } else {
      setFullNameError("");
    }

    if (!email) {
      setEmailError("Email Address is required");
      return;
    } else {
      setEmailError("");
    }

    const remainingPlaces =
      event.spots_available - (event.attendees?.length || 0);
    if (remainingPlaces <= 0) {
      return;
    } else {
      const newAttendee = `${fullName} (${email})`;
      const attendees = Array.isArray(event.attendees) ? event.attendees : [];
      const { data, error } = await supabase
        .from("games")
        .update({ attendees: [...attendees, newAttendee] })
        .eq("id", eventUUID);

      if (error) {
        console.error(
          "Error updating attendees: ",
          "Unable to update attendees",
        );
      } else {
        setEvent(data);
        setErrorMessage("");
        setFullName("");
        setEmail("");
        // Navigate to the booking confirmation page
        router.push("/bookingconfirmation");
      }
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
            <div className={styles.tomEdit}>
              <h1 className={styles.subtitle}>{event.title}</h1>
              <button className={styles.editButton} onClick={handleEditDelete}>
                Edit
              </button>
            </div>

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

            {remainingPlaces > 0 && (
              <form onSubmit={handleBookIn}>
                <div className={styles.contactForm}>
                  <label htmlFor="fullName">Full Name:</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  {fullNameError && (
                    <p className={styles.error}>{fullNameError}</p>
                  )}
                </div>
                <div className={styles.contactForm}>
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && <p className={styles.error}>{emailError}</p>}
                </div>
                <button type="submit" className={styles.requestButton}>
                  BOOK IN
                </button>
              </form>
            )}
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

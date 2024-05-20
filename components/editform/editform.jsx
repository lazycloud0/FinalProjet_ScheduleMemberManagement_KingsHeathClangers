"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import styles from "./editform.module.css";

let UUID = "776a4b75-4d52-4920-a244-efe8d8f18c53";
const allowedTeams = ["Men", "Women", "Under 14s", "Under 18s", "Open to All"];

export default function EditForm() {
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({
    event_type: "",
    date: "",
    time: "",
    team: "",
    location: "",
  });

  useEffect(() => {
    const getGame = async () => {
      const { data: game, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", UUID)
        .single();

      if (error) {
        console.error("Error fetching game: ", error);
      } else if (game) {
        setEvent({
          id: game.id,
          event_type: game.event_type,
          date: game.date,
          time: game.time,
          team: game.team,
          location: game.location,
        });
        setForm({
          event_type: game.event_type,
          date: game.date,
          time: game.time,
          team: game.team,
          location: game.location,
        });
      }
    };
    getGame();
  }, []);

  const deleteGame = async () => {
    const { error } = await supabase.from("games").delete().eq("id", UUID);

    if (error) {
      console.error("Error deleting game: ", error);
    } else {
      setEvent(null);
    }
  };

  const updateGame = async () => {
    const { error } = await supabase.from("games").update(form).eq("id", UUID);

    if (error) {
      console.error("Error updating game: ", error);
    } else {
      setEvent(form);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      {event && (
        <form className={styles.contactForm}>
          <h3 className={styles.subtitle}>Edit Event</h3>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="event_type">
              Event Type:
            </label>
            <input
              type="text"
              id="event_type"
              name="event_type"
              value={form.event_type}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="date">
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="time">
              Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={form.time}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="location">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={form.location}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formSection}>
            <label className={styles.label} htmlFor="team">
              Team:
            </label>
            <select
              id="team"
              name="team"
              value={form.team}
              onChange={handleInputChange}
            >
              {allowedTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          <button className={styles.requestButton} onClick={updateGame}>
            UPDATE EVENT
          </button>
          <button className={styles.requestButton} onClick={deleteGame}>
            DELETE EVENT
          </button>
        </form>
      )}
    </div>
  );
}

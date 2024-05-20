"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";

let UUID = "12ebed2a-a3e1-4f8f-ba0a-64f18cb0115a";

export default function AllEvents() {
  const [event, setEvent] = useState(null); // Changed to singular since we're fetching a single event

  // Define a `useEffect` hook that performs a get request from supabase and map the desired data out.
  useEffect(() => {
    const getGame = async () => {
      const { data: game, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", UUID) // Use the UUID variable here
        .single(); // Use the single method to get a single record

      if (error) {
        console.error("Error fetching game: ", error);
      } else if (game) {
        setEvent({
          id: game.id,
          title: game.event_type,
          date: game.date,
          time: game.time,
          team: game.team,
          location: game.location,
        });
      }
    };
    getGame();
  }, []);

  return (
    <>
      <div>All Events</div>
      {event && (
        <div>
          <p>
            <br></br>
          </p>
          <p>
            <br></br>
          </p>
          <p>
            <br></br>
          </p>
          <p>ID: {event.id}</p>
          <p>Title: {event.title}</p>
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
          <p>Team: {event.team}</p>
          <p>Location: {event.location}</p>
        </div>
      )}
    </>
  );
}

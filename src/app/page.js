"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../utils/supabase.js";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getGames() {
      const { data: game } = await supabase.from("games").select("*");

      if (games) {
        setGames(game);
      }
    }
    getGames();
  }, [games]);

  return (
    <div>
      {games.map((game) => (
        <>
          <Link key={game.tpye_event} href={`/games/${game.type_event}`}>
            <h2>{game.type_event}</h2>
          </Link>
          <Link key={game.id} href={`/games/${game.id}`}>
            <h2>{game.id}</h2>
          </Link>
        </>
      ))}
    </div>
  );
}
async function addEvent(event) {
  const { data, error } = await supabase.from("games").insert([
    {
      event_type: event.event_type,
      date: event.date,
      time: event.time,
      location: event.location,
      team: event.team,
    },
  ]);

  if (error) {
    console.error("Error adding event:", error);
    return null; // or handle the error appropriately
  }

  console.log("Event added successfully:", data);
  return data; // Return the inserted data if needed
}
const eventData = {
  event_type: "Practice",
  date: "2024-06-01",
  time: "14:00",
  location: "Field A",
  team: "U16",
};

addEvent(eventData)
  .then((data) => console.log("Inserted event:", data))
  .catch((error) => console.error("Failed to insert event:", error));

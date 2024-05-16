"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase.js";

export default function ListGame() {
  const [games, setGames] = useState([]);
  // const [loading, setLoading] = useState(true);

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
          <h2>
            {game.team} {game.event_type}
          </h2>
          <h2>location: {game.location}</h2>
        </>
      ))}
    </div>
  );
}

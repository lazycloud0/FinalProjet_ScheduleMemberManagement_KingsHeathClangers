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

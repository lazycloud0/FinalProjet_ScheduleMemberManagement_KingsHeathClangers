"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "/Users/winnielau/Desktop/Site/FinalProject_ScheduleMemberManagement_KingsHeathClangers/utils/supabase.js";

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getGames() {
      const { data: game } = await supabase.from("games").select("type_event");

      if (games) {
        setGames(game);
      }
    }

    getGames();
  }, [games]);

  return (
    <div>
      {games.map((game) => (
        <Link key={game.id} href={`/games/${game.id}`}>
          <h2>{game.id}</h2>
        </Link>
      ))}
    </div>
  );
}

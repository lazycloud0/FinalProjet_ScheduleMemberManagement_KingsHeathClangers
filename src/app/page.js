"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../utils/supabase.js";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getGames() {
      const { data: game } = await supabase.from("games").select("id");

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

// import styles from "./page.module.css";
// import  {getGames}  from "./_app.js";

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <p>Hello World</p>

//       <button onClick={getGamesGames}>Fetch Games</button>
//     </main>
//   );
// }

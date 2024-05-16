"use client";

    import { useState, useEffect } from "react";
    import { supabase } from "../utils/supabase.js";
    
    export default function GetEvents() {
      const [games, setGames] = useState([]);
    //   const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        async function getGames() {
          const { data: game } = await supabase
          .from("games")
          .select("*");
    
          if (games) {
            setGames(game);
          }
        }
        getGames();
      }, [games]);

      console.log(games.id);
    
      return (
        <div>
          {games.map((game) => (
            <>
              <h2>
                {game.date} {game.event_type}
                </h2>
            </>
          ))}
        </div>
      );
    }
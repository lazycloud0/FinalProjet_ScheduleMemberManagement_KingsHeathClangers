"use client";

import React, { useState } from "react";

export const AddGame = ({ onSubmit }) => {
  const [game, setGame] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the onSubmit function with the form data

    //Sample data
    const gameData = {
      date: "Your Game Title",
      time: "Action",
      location: "KHC",
      event_type: "game",
      team: "Youth",
      attendees: null,
    };

    try {
      const { data, error } = await supabase.from("games").insert([gameData]);
      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        console.log("Game added successfully:", data);
        // Optionally, redirect the user or show a success message
      }
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }

    onSubmit({ game });
  };

  return (
    <>
      <form name="threedfrom" onSubmit={handleSubmit}>
        <textarea style={{ display: "none" }} name="PaReq"></textarea>
        <input type="hidden" name="game" value={game} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddGame;

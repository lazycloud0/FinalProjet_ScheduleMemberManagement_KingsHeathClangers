"use client";

import React, { useState } from "react";
import { supabase } from "../../utils/supabase"; // Make sure to import your supabase client

export const AddGame = () => {
  const [gameData, setGameData] = useState({
    event_type: "",
    date: "",
    time: "",
    location: "",
    team: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("games").insert([gameData]);
      if (error) {
        console.error("Error inserting data:", error.message);
        return; // Handle the error appropriately
      }
      console.log("Game added successfully:", data);
      // Optionally, reset the form fields
      setGameData({
        event_type: "",
        date: "",
        time: "",
        location: "",
        team: "",
      });
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form-headers">Add New Game</h1>
        <div className="form-div">
          <label htmlFor="date" className="labels-inputs">
            Date
          </label>
          <input
            type="text"
            id="date"
            name="date"
            className="labels-inputs"
            value={gameData.date}
            onChange={handleChange}
          />
          <label htmlFor="time" className="labels-inputs">
            Time
          </label>
          <input
            type="text"
            id="time"
            name="time"
            className="labels-inputs"
            value={gameData.time}
            onChange={handleChange}
          />
          <label htmlFor="event_type" className="labels-inputs">
            Event Type
          </label>
          <input
            type="text"
            id="event_type"
            name="event_type"
            className="labels-inputs"
            value={gameData.event_type}
            onChange={handleChange}
          />
          <label htmlFor="location" className="labels-inputs">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="labels-inputs"
            value={gameData.location}
            onChange={handleChange}
          />
          <label htmlFor="team" className="labels-inputs">
            Team
          </label>
          <input
            type="text"
            id="team"
            name="team"
            className="labels-inputs"
            value={gameData.team}
            onChange={handleChange}
          />
        </div>

        <div className="bigger-button-div">
          <div className="button-div">
            <button type="submit" className="submit-button">
              Add Game
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddGame;

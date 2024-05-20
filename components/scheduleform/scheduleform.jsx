"use client";
import React, { useState, useReducer } from "react";
import styles from "./scheduleform.module.css";
import { supabase } from "../../utils/supabase";

//trial merge

// 1. Initial state for form data and errors
const initialState = {
  formData: {
    event_type: "",
    date: "",
    time: "",
    location: "",
    team: "",
  },
  errors: {},
  loading: false, // Initially set to false
};

const times = Array.from({ length: 48 }, (v, i) => {
  const hour = Math.floor(i / 2)
    .toString()
    .padStart(2, "0");
  const minute = ((i % 2) * 30).toString().padStart(2, "0");
  return `${hour}:${minute}`;
});

const allowedTeams = ["Men", "Women", "Under 14s", "Under 18s", "Open to All"];

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

// Reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };
    case "UPDATE_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "RESET_FIELDS":
      return {
        ...state,
        formData: initialState.formData,
        message: action.payload,
      };
    default:
      return state;
  }
}

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [message, setMessage] = useState("");
  // Destructure state variables
  const { formData, errors, loading } = state;

  function handleInputChanges(e) {
    const { name, value } = e.target;

    // Update the form data
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { name, value },
    });

    // Check if the input is for the date field
    if (name === "date") {
      // Check if the typed value is empty or matches the date format
      if (value === "" || dateRegex.test(value)) {
        // Clear the date error message if it was previously shown
        if (errors.date) {
          dispatch({
            type: "UPDATE_ERRORS",
            payload: {
              ...errors,
              date: "",
            },
          });
        }
      } else {
        // If the typed value doesn't match the date format, show an error message
        dispatch({
          type: "UPDATE_ERRORS",
          payload: {
            ...errors,
            date: "Date is required",
          },
        });
      }
    }

    // Check if the input is for the time field
    if (name === "time") {
      // Check if the typed value is empty or matches the time format
      if (value === "" || timeRegex.test(value)) {
        // Clear the time error message if it was previously shown
        if (errors.time) {
          dispatch({
            type: "UPDATE_ERRORS",
            payload: {
              ...errors,
              time: "",
            },
          });
        }
      } else {
        // If the typed value doesn't match the time format, show an error message
        dispatch({
          type: "UPDATE_ERRORS",
          payload: {
            ...errors,
            time: "Time is required",
          },
        });
      }
    }
    if (name === "team") {
      if (!allowedTeams.includes(value)) {
        dispatch({
          type: "UPDATE_ERRORS",
          payload: {
            ...errors,
          },
        });
      } else {
        // Clear the team error message if it was previously shown
        if (errors.team) {
          dispatch({
            type: "UPDATE_ERRORS",
            payload: {
              ...errors,
              team: "",
            },
          });
        }
      }
    }
  }
  //--------------------------------------------------------------------------------
  // modified handleSubmit function
  //
  function handleSubmit(e) {
    e.preventDefault();
    // If already loading, prevent form submission
    if (loading) return;

    // Set loading state to true when form is submitted
    dispatch({ type: "SET_LOADING", payload: true });
    // Set loading state to true when form is submitted
    dispatch({ type: "UPDATE_ERRORS", payload: {} });

    // Clear previous error messages
    dispatch({ type: "UPDATE_ERRORS", payload: {} });

    // Simulate a delay to mimic form submission
    setTimeout(() => {
      // Reset loading state to false after delay
      dispatch({ type: "SET_LOADING", payload: false });

      // Check each field for empty value and set error message if empty
      const newErrors = {};
      for (const field in formData) {
        if (!formData[field]) {
          let fieldName = field.charAt(0).toUpperCase() + field.slice(1);
          if (field === "event_type") {
            fieldName = "Event";
          }
          newErrors[field] = `${fieldName} is required`;
        }
      }

      // Check for format errors in the date and time fields
      if (!dateRegex.test(formData.date)) {
        newErrors.date = "Date is required";
      } else {
        const [year, month, day] = formData.date.split("-").map(Number);
        const inputDate = new Date(year, month - 1, day); // JavaScript months are 0-indexed
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Reset time part, to compare only the date part

        if (inputDate < currentDate) {
          newErrors.date = "Date cannot be before the current date";
        } else if (month > 12) {
          newErrors.date = "Month cannot be more than 12";
        } else if (day > 31) {
          newErrors.date = "Day cannot be more than 31";
        }
      }

      if (!timeRegex.test(formData.time)) {
        newErrors.time = "Time is required";
      } else {
        const [hour, minute] = formData.time.split(":").map(Number);
        if (hour > 24) {
          newErrors.time = "Hour cannot be more than 24";
        } else if (minute > 59) {
          newErrors.time = "Minute cannot be more than 59";
        }
      }

      // Additional validation for location field if needed
      // Example: Check if location is not empty

      // Update errors state
      dispatch({
        type: "UPDATE_ERRORS",
        payload: newErrors,
      });

      // If there are errors, prevent form submission
      if (Object.keys(newErrors).length > 0) {
        console.log("Errors:", newErrors);
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }
      // If all required fields are filled, proceed with form submission
      console.log("Form submitted successfully!");

      const { event_type, date, time, location, team } = formData;

      // Send a post request to Supabase with the formData
      supabase
        .from("games")
        .insert([{ event_type, date, time, location, team }])
        .then(({ data, error }) => {
          if (error) {
            console.error("Error inserting data:", error.message);
            dispatch({ type: "SET_LOADING", payload: false });
          } else {
            console.log("Game added successfully:", data);

            setMessage("Event added to the calendar"); // Set the success message immediately

            setTimeout(() => {
              setMessage(""); // Clear the message after 2 seconds
            }, 2000); // 2000ms = 2 seconds

            setTimeout(() => {
              dispatch({ type: "RESET_FIELDS", payload: "" }); // Clear the form after a delay
            }, 2000); // 1000ms = 1 seconds
          }
        })
        .catch((error) => {
          console.error("Error inserting data:", error.message);
          dispatch({ type: "SET_LOADING", payload: false });
        });
    }, 1000); // Change the delay as needed
  }

  //--------------------------------------------------------------------------------

  return (
    <>
      <div className={styles.container}>
        <form
          className={styles.contactForm}
          onSubmit={handleSubmit}
          disabled={loading}
        >
          <h3 className={styles.subtitle}>Add New Event</h3>
          <div className={styles.formSection}>
            <label htmlFor="event_type"></label>
            <br />
            <input
              type="text"
              placeholder="Event"
              className={styles.placeholder}
              id="event_type"
              name="event_type"
              value={formData.event_type}
              onChange={handleInputChanges}
            />
            <br />
            {errors.event_type && (
              <span className={styles.error}>{errors.event_type}</span>
            )}
          </div>
          <div className={styles.formSection}>
            <label htmlFor="date"></label>
            <br />
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChanges}
            />
            <br />
            {errors.date && <span className={styles.error}>{errors.date}</span>}
          </div>

          <div className={styles.formSection}>
            <label htmlFor="time"></label>
            <br />
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChanges}
            />
            <br />
            {errors.time && <span className={styles.error}>{errors.time}</span>}
          </div>

          <div className={styles.formSection}>
            <label htmlFor="location"></label>
            <br />
            <input
              type="text"
              placeholder="Location"
              className={styles.placeholder}
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChanges}
            />
            <br />
            {errors.location && (
              <span className={styles.error}>{errors.location}</span>
            )}
          </div>

          <div className={styles.formSection}>
            <label htmlFor="team"></label>
            <br />
            <select
              id="team"
              name="team"
              value={formData.team}
              onChange={handleInputChanges}
            >
              <option value="">Select a team</option>
              {allowedTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <br />
            {errors.team && <span className={styles.error}>{errors.team}</span>}
          </div>

          {/* Loading message */}
          {loading && <div>Loading...</div>}

          {/* Success message */}
          {message && <div>{message}</div>}

          <button
            className={styles.requestButton}
            type="submit"
            disabled={loading}
          >
            ADD EVENT
          </button>
        </form>
      </div>
    </>
  );
}

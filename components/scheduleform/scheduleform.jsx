"use client";
import React, { useState, useReducer } from "react";
import styles from "./scheduleform.module.css";
import { supabase } from "../../utils/supabase";

// Initial state for form data and errors
const initialState = {
  formData: {
    event_type: "",
    date: "",
    time: "",
    location: "",
    team: "",
    spots_available: "", // Initialize as an empty string for the default selection
  },
  errors: {},
  loading: false,
};

const times = Array.from({ length: 48 }, (v, i) => {
  const hour = Math.floor(i / 2)
    .toString()
    .padStart(2, "0");
  const minute = ((i % 2) * 30).toString().padStart(2, "0");
  return `${hour}:${minute}`;
});

const allowedTeams = ["Men", "Women", "Under 14s", "Under 18s", "Open to All"];
const spotsAvailableOptions = [
  "Number of spaces",
  ...Array.from({ length: 500 }, (v, i) => i + 1),
];

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

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
  const { formData, errors, loading } = state;

  function handleInputChanges(e) {
    let { name, value } = e.target;

    // Capitalize the first letter if the field is 'event_type' or 'location'
    if (name === "event_type" || name === "location") {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { name, value },
    });

    if (name === "date") {
      if (value === "" || dateRegex.test(value)) {
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
        dispatch({
          type: "UPDATE_ERRORS",
          payload: {
            ...errors,
            date: "Date is required",
          },
        });
      }
    }

    if (name === "time") {
      if (value === "" || timeRegex.test(value)) {
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
            team: "Invalid team selection",
          },
        });
      } else {
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

    if (name === "spots_available") {
      const spotsValue = parseInt(value, 10);
      if (value === "Number of spaces" || spotsValue < 0 || isNaN(spotsValue)) {
        dispatch({
          type: "UPDATE_ERRORS",
          payload: {
            ...errors,
            spots_available: "Number of spaces is required",
          },
        });
      } else {
        if (errors.spots_available) {
          dispatch({
            type: "UPDATE_ERRORS",
            payload: {
              ...errors,
              spots_available: "",
            },
          });
        }
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "UPDATE_ERRORS", payload: {} });

    setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: false });

      const newErrors = {};
      for (const field in formData) {
        if (!formData[field] && formData[field] !== 0) {
          let fieldName = field.charAt(0).toUpperCase() + field.slice(1);
          if (field === "event_type") {
            fieldName = "Event";
          }
          newErrors[field] = `${fieldName} is required`;
        }
      }

      if (!dateRegex.test(formData.date)) {
        newErrors.date = "Date is required";
      } else {
        const [year, month, day] = formData.date.split("-").map(Number);
        const inputDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

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

      if (
        formData.spots_available === "" ||
        formData.spots_available === "Number of spaces"
      ) {
        newErrors.spots_available = "Number of spaces is required";
      }

      dispatch({
        type: "UPDATE_ERRORS",
        payload: newErrors,
      });

      if (Object.keys(newErrors).length > 0) {
        console.log("Errors:", newErrors);
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }

      console.log("Form submitted successfully!");

      const { event_type, date, time, location, team, spots_available } =
        formData;

      supabase
        .from("games")
        .insert([{ event_type, date, time, location, team, spots_available }])
        .then(({ data, error }) => {
          if (error) {
            console.error("Error inserting data:", error.message);
            dispatch({ type: "SET_LOADING", payload: false });
          } else {
            console.log("Game added successfully:", data);

            setMessage("Event added to the calendar");

            setTimeout(() => {
              setMessage("");
            }, 2000);

            setTimeout(() => {
              dispatch({ type: "RESET_FIELDS", payload: "" });
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error inserting data:", error.message);
          dispatch({ type: "SET_LOADING", payload: false });
        });
    }, 1000);
  }

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
              placeholder="Event Name"
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
              placeholder="DD/MM/YYYY"
              className={styles.placeholderText}
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
              placeholder="HH:MM"
              className={styles.placeholderText}
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
              className={styles.placeholderText}
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
          <div className={styles.formSection}>
            <label htmlFor="spots_available"></label>
            <br />
            <select
              id="spots_available"
              name="spots_available"
              value={formData.spots_available}
              onChange={handleInputChanges}
              className={styles.placeholderText}
            >
              {spotsAvailableOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <br />
            {errors.spots_available && (
              <span className={styles.error}>{errors.spots_available}</span>
            )}
          </div>
          {loading && <div>Loading...</div>}
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

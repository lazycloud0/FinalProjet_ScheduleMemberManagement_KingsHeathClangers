"use client"
import React, { useState, useReducer } from "react";
import styles from "./scheduleform.module.css";

// 1. Initial state for form data and errors
const initialState = {
    formData: {
        event: "",
        date: "",
        time: "",
        location: ""
    },
    errors: {},
    loading: false // Initially set to false
};

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

// Reducer function to handle state updates
function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FORM_DATA':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.payload.name]: action.payload.value
                }
            };
        case 'UPDATE_ERRORS':
            return {
                ...state,
                errors: action.payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}

export default function Form() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Destructure state variables
    const { formData, errors, loading } = state;

    function handleInputChanges(e) {
        const { name, value } = e.target;
        dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: { name, value }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        // If already loading, prevent form submission
        if (loading) return;

        // Set loading state to true when form is submitted
        dispatch({ type: 'SET_LOADING', payload: true });

        // Clear previous error messages
        dispatch({ type: 'UPDATE_ERRORS', payload: {} });

        // Simulate a delay to mimic form submission
        setTimeout(() => {
            // Reset loading state to false after delay
            dispatch({ type: 'SET_LOADING', payload: false });

            // Check each field for empty value and set error message if empty
            const newErrors = {};
            for (const field in formData) {
                if (!formData[field]) {
                    newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                }
            }

            // Update errors state
            dispatch({
                type: 'UPDATE_ERRORS',
                payload: newErrors
            });

            // If there are errors, prevent form submission
            if (Object.keys(newErrors).length > 0) {
                console.log('Errors:', newErrors);
                return;
            }

            // If all required fields are filled, proceed with form submission
            console.log('Form submitted successfully!');
            // You can continue with your form submission logic here
        }, 1000); // Change the delay as needed
    }


    function handleInputChanges(e) {
        const { name, value } = e.target;
    
        // Update the form data
        dispatch({
            type: 'UPDATE_FORM_DATA',
            payload: { name, value }
        });
    
        // Check if the input is for the date field
        if (name === 'date') {
            // Check if the typed value is empty or matches the date format
            if (value === '' || dateRegex.test(value)) {
                // Clear the date error message if it was previously shown
                if (errors.date) {
                    dispatch({
                        type: 'UPDATE_ERRORS',
                        payload: {
                            ...errors,
                            date: ''
                        }
                    });
                }
            } else {
                // If the typed value doesn't match the date format, show an error message
                dispatch({
                    type: 'UPDATE_ERRORS',
                    payload: {
                        ...errors,
                        date: 'Date must be in YYYY-MM-DD format'
                    }
                });
            }
        }
    
        // Check if the input is for the time field
        if (name === 'time') {
            // Check if the typed value is empty or matches the time format
            if (value === '' || timeRegex.test(value)) {
                // Clear the time error message if it was previously shown
                if (errors.time) {
                    dispatch({
                        type: 'UPDATE_ERRORS',
                        payload: {
                            ...errors,
                            time: ''
                        }
                    });
                }
            } else {
                // If the typed value doesn't match the time format, show an error message
                dispatch({
                    type: 'UPDATE_ERRORS',
                    payload: {
                        ...errors,
                        time: 'Time must be in HH:MM format'
                    }
                });
            }
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
    
        // If already loading, prevent form submission
        if (loading) return;
    
        // Set loading state to true when form is submitted
        dispatch({ type: 'SET_LOADING', payload: true });
    
        // Clear previous error messages
        dispatch({ type: 'UPDATE_ERRORS', payload: {} });
    
        // Simulate a delay to mimic form submission
        setTimeout(() => {
            // Reset loading state to false after delay
            dispatch({ type: 'SET_LOADING', payload: false });
    
            // Check each field for empty value and set error message if empty
            const newErrors = {};
            for (const field in formData) {
                if (!formData[field]) {
                    newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                }
            }
    
            // Check for format errors in the date and time fields
            if (!dateRegex.test(formData.date)) {
                newErrors.date = 'Date must be in YYYY-MM-DD format';
            } else {
                const [year, month, day] = formData.date.split('-').map(Number);
                if (year < 2024) {
                    newErrors.date = 'Year cannot be less than 2024';
                } else if (month > 12) {
                    newErrors.date = 'Month cannot be more than 12';
                } else if (day > 31) {
                    newErrors.date = 'Day cannot be more than 31';
                }
            }
    
            if (!timeRegex.test(formData.time)) {
                newErrors.time = 'Time must be in HH:MM format';
            } else {
                const [hour, minute] = formData.time.split(':').map(Number);
                if (hour > 24) {
                    newErrors.time = 'Hour cannot be more than 24';
                } else if (minute > 59) {
                    newErrors.time = 'Minute cannot be more than 59';
                }
            }
    
            // Update errors state
            dispatch({
                type: 'UPDATE_ERRORS',
                payload: newErrors
            });
    
            // If there are errors, prevent form submission
            if (Object.keys(newErrors).length > 0) {
                console.log('Errors:', newErrors);
                return;
            }
    
            // If all required fields are filled and correctly formatted, proceed with form submission
            console.log('Form submitted successfully!');
            // You can continue with your form submission logic here
        }, 1000); // Change the delay as needed
    }

    return (
        <>
            <form className={styles.contactForm} onSubmit={handleSubmit} disabled={loading}>
                <h3 className={styles.subtitle}>Add New Event</h3>
                <div className={styles.formSection}>
                    <label htmlFor="event">Event:</label><br />
                    <input type="text" id="event" name="event" value={formData.event} onChange={handleInputChanges} /><br />
                    {errors.event && <span className={styles.error}>{errors.event}</span>}
                </div>

                <div className={styles.formSection}>
                    <label htmlFor="date">Date:</label><br />
                    <input type="text" id="date" name="date" value={formData.date} onChange={handleInputChanges} /><br />
                    {errors.date && <span className={styles.error}>{errors.date}</span>}
                </div>

                <div className={styles.formSection}>
                    <label htmlFor="time">Time:</label><br />
                    <input type="text" id="time" name="time" value={formData.time} onChange={handleInputChanges} /><br />
                    {errors.time && <span className={styles.error}>{errors.time}</span>}
                </div>

                <div className={styles.formSection}>
                    <label htmlFor="location">Location:</label><br />
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChanges} /><br />
                    {errors.location && <span className={styles.error}>{errors.location}</span>}
                </div>

                
                {/* Loading message */}
                {loading && <div>Loading...</div>}

                <button className={styles.requestButton} type="submit" disabled={loading}>Add Event
                </button>
            </form>
        </>
    );
}

"use client"; // Indicates this script runs on the client side

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import styles from "./loginform.module.css"; // Import the CSS module for styling

export default function Login() {
  // Initialise state variables for username and password or sign up
  const [username] = useState("");
  const [password] = useState("");
  const [showSignupForm, setShowSignupForm] = useState(false);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Authentication logic
    // Replace this with actual authentication logic, such as calling an API
    authenticateUser(username, password)
      .then((response) => {
        if (response.success) {
          // Authentication successful, redirect to another page or update state
          console.log("Logged in successfully");
          // Redirect to whatson page
          window.location.href = "/whatson"; // Example redirection
        } else {
          // Authentication failed, show error message
          alert("Invalid credentials."); // Alert the user about invalid credentials
        }
      })
      .catch((error) => {
        // Handle network errors or other issues
        console.error("Error during authentication:", error); // Log the error
        alert("An error occurred. Please try again."); // Inform the user about the error
      });
  };

  const handleToggle = () => {
    setShowSignupForm(!showSignupForm);
  };

  const switchLabel = showSignupForm ? "Login" : "Sign Up";

  // Render the login form
  return (
    <Box className={styles.container}>
      <FormControlLabel
        control={<Switch checked={showSignupForm} onChange={handleToggle} />}
        label={switchLabel}
      />
      {!showSignupForm ? (
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Link href="#" underline="hover" className={styles.forgotPassword}>
              Forgot Password?
            </Link>
            <Button
              variant="contained"
              className={styles.loginButton}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      ) : (
        <div className={styles.signupContainer}>
          <h2>Sign Up</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              className={styles.signupButton}
              type="submit"
            >
              Sign Up
            </Button>
            <Link
              href="/privacy-policy"
              underline="hover"
              className={styles.privacyPolicy}
            >
              Privacy Policy
            </Link>
          </form>
        </div>
      )}
    </Box>
  );
}

// Placeholder function for authentication logic
function authenticateUser(username, password) {
  // This function should contain the logic to authenticate the user,
  // such as sending a request to a server with the username and password.
  // It returns a promise that resolves with an object indicating success or failure.
  return Promise.resolve({ success: true }); // Placeholder return value
}

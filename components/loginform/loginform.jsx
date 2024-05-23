"use client"; // Indicates this script runs on the client side

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import styles from "./loginform.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login() {
  // Initialise state variables for login
  const [username] = useState("");
  const [password] = useState("");
  const [showSignupForm, setShowSignupForm] = useState(false);

  // Step 1: Add state for FORM VALIDATION on sign up
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [signupFormReady, setSignupFormReady] = useState(false);

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

  // Step 2: Create a function to validate the "First Name" field
  const validateFirstName = (event) => {
    const firstName = event.target.value;
    setFirstNameValid(firstName.trim().length > 0); // Correctly set validity based on the length of trimmed string
    setSignupFormReady(firstNameValid);
  };

  // Step 2: Create a function to validate the "Last Name" field
  const validateLastName = (event) => {
    const lastName = event.target.value;
    setLastNameValid(lastName.trim().length > 0); // Correctly set validity based on the length of trimmed string
    setSignupFormReady(lastNameValid);
  };

  // Step 2: Create a function to validate the "Email Address" field
  const validateEmail = (event) => {
    const email = event.target.value;
    setEmailValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)); // Check if email matches the pattern
    setSignupFormReady(emailValid);
  };

  // Step 2: Create a function to validate the "Password" field
  const validatePassword = (event) => {
    const password = event.target.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbol =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/g.test(
        password,
      );

    setPasswordValid(password.length >= 8 && hasUpperCase && hasSymbol);
    setSignupFormReady(passwordValid);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#484d58",
      },
      secondary: {
        main: "#f25e05",
      },
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: "grey!important",
            fontWeight: "bold",
            paddingTop: "5px",
            opacity: "50%",
          },
        },
      },
    },
  });

  // Render the login form
  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.container}>
        <FormControlLabel
          control={<Switch checked={showSignupForm} onChange={handleToggle} />}
          label={switchLabel}
        />
        {!showSignupForm ? (
          <div className={styles.loginContainer}>
            <h2 className={styles.header}>Login</h2>
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
              <Link
                href="#"
                underline="hover"
                className={styles.forgotPassword}
              >
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
          <div className={styles.loginContainer}>
            <h2 className={styles.header}>Sign Up</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!firstNameValid} // Step 3: Update TextField to display error
                helperText={!firstNameValid ? "First name is required" : ""} // Display error message if invalid
                onChange={validateFirstName} // Step 4: Call validation function on input change
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!lastNameValid} // Step 3: Update TextField to display error
                helperText={!lastNameValid ? "Last name is required" : ""} // Display error message if invalid
                onChange={validateLastName} // Step 4: Call validation function on input change
              />
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!emailValid} // Display error if email is not valid
                helperText={
                  !emailValid ? "Please enter a valid email address." : ""
                } // Show error message
                onChange={validateEmail} // Call validation function on input change
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!passwordValid} // Display error if password is not valid
                helperText={
                  !passwordValid
                    ? "Password must be at least 8 characters long, including one uppercase letter, one symbol and one number."
                    : ""
                } // Show error message
                onChange={validatePassword} // Call validation function on input change
              />
              <Link
                href="/privacy-policy"
                underline="hover"
                className={styles.privacyPolicy}
              >
                Privacy Policy
              </Link>
              <Button
                variant="contained"
                className={styles.loginButton}
                type="submit"
                disabled={!signupFormReady} // Disable button if form is not ready
              >
                Sign Up
              </Button>
            </form>
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
}

function authenticateUser(username, password) {
  // This function should contain the logic to authenticate the user,
  // such as sending a request to a server with the username and password.
  // It returns a promise that resolves with an object indicating success or failure.
  return Promise.resolve({ success: true }); // Placeholder return value
}

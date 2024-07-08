// import React from "react";
import styles from "./login.module.css";


import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.container}>
          <form className={styles.form}>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />

            <button formAction={login} className={styles.loginButton}>
              Log in
            </button>
            <button formAction={signup} className={styles.loginButton}>
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


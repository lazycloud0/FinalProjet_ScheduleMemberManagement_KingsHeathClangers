import React from "react";
import LargeLogo from "../../../components/logos/largeLogo";
import styles from "./login.module.css";
import LoginForm from "/components/loginform/loginform.jsx";

export default function Login() {
  return (
    <div className={styles.LoginPage}>
      <div className={styles.container}>
        <LargeLogo className={styles.largeLogo} />
        <LoginForm />
      </div>
    </div>
  );
}


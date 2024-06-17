import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./AuthButton.module.css";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <>
      <main>
        <div className={styles.div}>
          <h2 className={styles.h2}>Hello, {user.email}!</h2>
        </div>
        <div className={styles.div}>
          <form action={signOut}>
            <button className={styles.loginButton}>Logout</button>
          </form>
        </div>
      </main>
    </>
  ) : (
    <>
      <Link href="/login" className={styles.loginButton}>
        Login
      </Link>
    </>
  );
}

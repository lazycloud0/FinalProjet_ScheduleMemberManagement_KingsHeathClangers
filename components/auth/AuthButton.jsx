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
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className={styles.loginButton}>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login" className={styles.loginButton}
    >
      Login
    </Link>
  );
}

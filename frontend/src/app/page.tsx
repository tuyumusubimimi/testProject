'use client';
import './globals.css';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = async() => {
      const response = await fetch("http://localhost:8000/api/logout.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();

      console.log("logout:", result);

      if (!result.loggedIn) {
          router.push("/login");
      }
  };

  return (
    <main>
      <div>Home</div>
      <div>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    </main>
  );
}

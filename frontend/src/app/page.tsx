'use client';
import { useEffect, useState } from 'react';
import './globals.css';
import { useRouter } from "next/navigation";

export default function Home() {
  const [checkingSession, setCheckingSession] = useState(true);

  const router = useRouter();

  // ログアウト処理
  const handleLogout = async() => {
    // logoutAPIへデータを送信
    const response = await fetch("http://localhost:8000/api/logout.php", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // APIから結果を受信
    const result = await response.json();

    console.log("logout:", result);

    // ログアウト処理が完了したらログイン画面へ遷移
    if (!result.loggedIn) {
        router.push("/login");
    }
  };

  useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/check-session.php",
                    {
                        credentials: "include",
                    }
                );

                const result = await response.json();

                // console.log("Session:", result);

                if (!result.loggedIn) {
                    router.push("/login");
                    return;
                }
                // SESSION確認完了
                setCheckingSession(false);
            } catch (error) {
                console.error("Session check error:", error);
            }
        };

        checkSession();
    }, [router]);

    // SESSION確認中はTOPを表示しない
    if (checkingSession) {
        return null;
    }
  return (
    <main>
      <div>Home</div>
      <div>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    </main>
  );
}

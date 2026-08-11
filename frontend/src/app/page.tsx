'use client';
import { useEffect, useState } from 'react';
import './globals.css';
import { useRouter } from "next/navigation";
import { checkSession } from './common';

export default function Home() {
  const [checkingSession, setCheckingSession] = useState(true);

  const router = useRouter();

  // ログアウト処理
  const handleLogout = async() => {
    // logoutAPIへデータを送信
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout.php`, {
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
    const check = async () => {
        const loggedIn = await checkSession();

        // ログアウト状態でアクセスされたらログイン画面へ
        if (!loggedIn) {
            router.replace("/login");
            return;
        }

        setCheckingSession(false);
    };

    check();
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

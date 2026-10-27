'use client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import './globals.css';
import { useRouter } from "next/navigation";
import { checkSession } from './common';
import Image from 'next/image';
import styles from './main.module.css';

type UpLoadFormData = {
  upload_file: File,
}

export default function Home() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [images, setImages] = useState([]);

  const router = useRouter();

  const {
    register,
    handleSubmit, 
    formState:{errors},
  } = useForm<UpLoadFormData>();

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

  // The Cat APIから画像を取得する関数
  const handleGame = async() => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-api-key': `${process.env.MY_CAT_API_KEY}`,
      }
    });

    const result = await response.json();
    console.log('cat:', result);
    setImages(result);
  };

  const updateSubmit = () => {
    console.log('up');
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
        <div className={styles.content}>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
        <div className={styles.content}>
          <div>
            <button onClick={handleGame}>猫画像</button>
          </div>
          <div>
            {images.map((image, key) => (
              <Image key={key} src={image['url']} alt='neko' width={100} height={100} />
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <form onSubmit={handleSubmit(updateSubmit)}>
            <input
              type="file"
              id='upload_file'
              className="hidden"
              accept=".xlsx"
              {...register('upload_file', {
                required: 'アップロードするファイルを選択してください。',
                pattern: {
                  value: /\.xlsx$/,
                  message: 'Excelファイルを選択してください。'
                },
              })}
            />
            {errors.upload_file && <div className='error'>{errors.upload_file.message}</div>}
            <div><button type='submit'>Excelファイルアップロード</button></div>
          </form>
        </div>
      </div>
    </main>
  );
}

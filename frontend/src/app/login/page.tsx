"use client";
import { useForm } from 'react-hook-form';
import '../globals.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { checkSession } from '../common';

// ログインフォームから送るデータのデータ型を定義
type LoginFormData = {
    id: string;
    password: string;
}

export default function Login(){
    const [checkingSession, setCheckingSession] = useState(true);

    const router = useRouter();

    // react hook formの機能と実行タイミングを定義
    const {
        register,
        handleSubmit, 
        formState:{errors, isValid},
    } = useForm<LoginFormData>();

    useEffect(() => {
        const check = async () => {
            const loggedIn = await checkSession();

            // ログイン中にアクセスされたらHomeへ
            if (loggedIn) {
                router.replace("/");
                return;
            }

            setCheckingSession(false);
        };

        check();
    }, [router]);

    // SESSION確認中はloginを表示しない
    if (checkingSession) {
        return null;
    }

    // ログインボタンを押すとここが実行される
    const onSubmit = async(data: LoginFormData) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        
        // APIから結果を受信
        const result = await response.json();

        // ログイン処理が完了したらTop画面へ遷移
        if (result.loggedIn) {
            router.push("/");
        }
    };

    return(
        <div>
            <h1>ログイン画面</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input 
                        type='text' 
                        id='login_id' 
                        {...register('id', {
                            required: "IDは必須です。",
                            maxLength: {
                                value: 20,
                                message: '20文字以内で入力してください。'
                            }
                        })}/>
                    </div>
                    {errors.id && <div className='error'>{errors.id.message}</div>}
                    <div>
                        <input 
                        type='password'
                        id='password'
                        {...register('password', {
                            required: 'パスワードは必須です。',
                            maxLength: {
                                value: 20,
                                message: "20文字以内で入力してください。"
                            },
                            minLength:{
                                value: 6,
                                message: '6文字以上で入力してください。'
                            }
                        })}
                        />
                    </div>
                    {errors.password && <div className='error'>{errors.password.message}</div>}
                    <div>
                        <button type='submit' id='login-btn'>ログイン</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
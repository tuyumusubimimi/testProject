"use client";
import { useForm } from 'react-hook-form';
import '../globals.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { checkSession } from '../common';
import ToggleButton from '@/components/toggleButton';

// ログインフォームから送るデータのデータ型を定義
type LoginFormData = {
    id: string;
    password: string;
}

export default function Login(){
    // セッション確認中のフラグ
    const [checkingSession, setCheckingSession] = useState(true);
    // ログインエラーメッセージ
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    // トグルボタンのオンオフ
    const [isOn, setIsOn] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit, 
        formState:{errors},
    } = useForm<LoginFormData>();

    // 変化があったら対応する
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

        // セッションチェックをする
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
            setLoginErrorMessage('');
            router.push("/");
        }else{
            setLoginErrorMessage('IDかパスワードが間違っています。');
        }
    };

    // トグルボタンが押されたらパスワード表示切り替え
    const changePassword = (value: boolean) => {
        setIsOn(value);
    }

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
                        {errors.id && <div className='error'>{errors.id.message}</div>}
                    </div>
                    <div>
                        <input 
                        type={isOn ? 'text' : 'password'}
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
                        <ToggleButton onClick={changePassword}></ToggleButton>
                        {errors.password && <div className='error'>{errors.password.message}</div>}
                    </div>
                    <div>
                        <div className='error'>{loginErrorMessage}</div>
                        <button type='submit' id='login-btn'>ログイン</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
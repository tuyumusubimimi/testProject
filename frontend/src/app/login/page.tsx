"use client";
import { SubmitHandler, useForm } from 'react-hook-form';
import '../globals.css';

// ログインフォームから送るデータのデータ型を定義
type LoginFormData = {
    id: string;
    password: string;
}

export default function Login(){
    // react hook formの機能と実行タイミングを定義
    const {
        register,
        handleSubmit, 
        formState:{errors, isValid},
    } = useForm<LoginFormData>();

    // ログインボタンを押すとここが実行される
    const onSubmit = async(data: LoginFormData) => {
        const response = await fetch("http://localhost:8000/api/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result);
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
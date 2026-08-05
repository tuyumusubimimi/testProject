import { useForm } from 'react-hook-form';

export default function Login(){
    return(
        <div>
            <h1>ログイン画面</h1>
            <div>
                <form>
                    <div>
                        <input type='text'/>
                    </div>
                    <div>
                        <input type='password'/>
                    </div>
                    <div>
                        <button>ログイン</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
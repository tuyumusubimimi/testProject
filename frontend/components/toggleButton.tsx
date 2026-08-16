import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface prop{
    onClick:(value: boolean) => void;
}

/**
 * トグルボタンパーツ
 * @param param0 
 * @returns onClick トグルボタンが押されたら親に返される関数
 */
export default function toggleButton({onClick} : prop){
    const [isOn, setIsOn] = useState(false);

    const {
        handleSubmit, 
    } = useForm<prop>();

    // ボタンが押されたらtrue/false切り替え、切り替えた値を親に返す関数にセット
    const onSubmit = () => {
        setIsOn(!isOn);
        onClick(!isOn);
    }

    return (
        <span>
            <button className='toggleButton' onClick={handleSubmit(onSubmit)}>
                <Image 
                src={isOn ? '/img/eye.svg' : '/img/closeEye.svg'} 
                alt='トグルボタン'
                width={15} 
                height={15}
                />
            </button>
        </span>
    );
}
export default function LoginLayout({
    children,
}:{
    children:React.ReactNode;
}){
    return(
        <div>
            <h2>loginレイアウト</h2>
            {children}
        </div>
    )
}
export default function LoginLayout({
    children,
}:{
    children:React.ReactNode;
}){
    return(
        <div>
            <h2>login</h2>
            {children}
        </div>
    )
}
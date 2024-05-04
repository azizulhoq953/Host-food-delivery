'use client';
// import { log } from "console";
import { signIn } from "next-auth/react";
import Image from "next/image"
import { useState } from "react";
export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ loginInProgress, setLoginInProgress] = useState(false);
    async function handleFormSubmit(ev) {
       ev.preventDefault();
       setLoginInProgress(true);

       await signIn('Credentials', {email, password, callbackUrl: '/'})
       setLoginInProgress(false);
    }
    return (
        <section className=" mt-4">
            <h1 className=" text-center text-primary text-4xl mb-4">
                Login Page
            </h1>
            
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input type="email" placeholder="email" value={email}
                    disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)} /> 
                <input type="password" placeholder="password" value={password}
                   disabled={loginInProgress}
                   onChange={ev => setPassword(ev.target.value)}/>

                <button disabled={loginInProgress} type="submit" className=" bg-primary   ">Login</button>
                <div className="my-4 text-center text-gray-500">
                    or Login With Provider
                </div>
                <button onClick={() => signIn('google', {callbackUrl: '/'})}
                 className=" flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24}/>
                    Login With google
                </button>
            </form>
        </section>
    )
}
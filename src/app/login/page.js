"use client";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"
import firebaseStorage from "@/helpers/storage"
import { toast } from "react-hot-toast";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })

    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    const handleSingleFileChange = async (e) => {
        const fileList = e.target.files
        if(fileList && fileList[0]){
            try {
                const file = fileList[0];
                const storageRef = ref(firebaseStorage, `/files/${file.name}`)
                const uploadTask = uploadBytesResumable(storageRef, file);
            
                await uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const currentPercent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        console.log(currentPercent)
                    },
                    (err) => {
                        console.log(error)
                    },
                    async () => {
                        // download url
                        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log(url)                        
                        });
                    }
                )
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none    focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
        />
        <input
            type="file"
            onChange={handleSingleFileChange}
             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none    focus:border-gray-600 text-black"
        />
        <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here
        </button>
        <div>{session && session.user && session.user.email} </div>
        <>
            <div className=''>
                {providers &&
                Object.values(providers).map((provider) => {
                    const handleProviderSignIn = () => signIn(provider.id)
                    return (
                        <button
                            type='button'
                            key={provider.name}
                            onClick={handleProviderSignIn}
                            className='"p-2 border border-gray-300'
                        >
                            Sign in with {provider.name}
                        </button>
                    )
                })}
            </div>
          </>
            <Link href="/signup">Visit Signup page</Link>
        </div>
    )

}
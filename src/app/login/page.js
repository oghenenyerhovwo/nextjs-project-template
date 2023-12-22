"use client";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"
import firebaseStorage from "@/helpers/storage"
import { toast } from "react-hot-toast";
import { googleLogout } from '@react-oauth/google';

import {
    OneTapGoogle,
    Google,
} from "@/components"


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");

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
            setMessage(response.message)
            toast.success("Login success");
            router.push("/profile");
        } catch (error) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    const onLogout = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/users/logout");
            console.log(response)
            setMessage(response.message)
            toast.success("Login success");
        } catch (error) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    const onLogoutGoogle = () => {
        setMessage("Google logged out")
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
                            setMessage(url)                       
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
        
        <label htmlFor="email">email</label>
        <p>{message} </p>
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
        <OneTapGoogle setMessage={setMessage} />
        <button onClick={googleLogout}>Log Google user out</button>
        <Google setMessage={setMessage} />
            <Link href="/signup">Visit Signup page</Link>
        </div>
    )

}
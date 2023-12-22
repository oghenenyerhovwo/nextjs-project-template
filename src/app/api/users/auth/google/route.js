import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios"
import  { OAuth2Client } from 'google-auth-library';


import {
  User,
} from "@/models";

import {
  databaseConnection,
} from '@/config';

databaseConnection()

const client = new OAuth2Client(process.env.GOOGLE_ID)

export async function POST(request){
    try {

        const reqBody = await request.json()
        const { credential } = reqBody;

        let decodedDetails = {}
        if(credential.type === "credential"){
            console.log("client")
            console.log(client)
            const ticket = await client.verifyIdToken({
                idToken: credential.token,
                audience: process.env.GOOGLE_ID
            })
            decodedDetails = ticket.getPayload()
        } else if (credential.type === "access_token"){
            const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
            if(!googleResponse.data){
                return NextResponse.json({error: "Unable to sign in google"}, {status: 500})
            } 
            decodedDetails = googleResponse.data                    
        }

        const response = NextResponse.json({
            message: "Google Login successful",
            success: true,
        })
        return response;

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
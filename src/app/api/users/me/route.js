import { NextRequest, NextResponse } from "next/server";

import {
  User,
} from "@/models";

import {
  databaseConnection,
} from '@/config';

import { getUserDataFromToken } from "@/helpers/";

databaseConnection()

export async function GET(request){

    try {
        const userId = await getUserDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}
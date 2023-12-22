import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import {setError, setHeader, serverUrl} from "@/helpers"

export const signUp = createAsyncThunk(`SIGN_UP_USER`, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios
      .post(
        `${serverUrl}/users/signup`
      )
    return data
  } catch (err) {
    return rejectWithValue(setError(err))
  }
})
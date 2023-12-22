import { configureStore } from '@reduxjs/toolkit'

import reducers from "./reducers"

const makeStore = () => {
  return configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== "production",
  })
}

export default makeStore
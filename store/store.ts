
// file: store.ts
import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthReducer'

// We'll use redux-logger just as an example of adding another middleware






const reducer={
    auth:AuthReducer
}

export const store = configureStore({
 reducer
})